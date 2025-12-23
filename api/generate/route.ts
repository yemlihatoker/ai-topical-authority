import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('credits').eq('id', session.user.id).single();
  if (!profile || profile.credits < 1) return NextResponse.json({ error: 'Yetersiz kredi' }, { status: 403 });

  const { keyword } = await req.json();
  
  try {
    const prompt = \SEO uzmanısın. Keyword: "\". JSON formatında Topical Map çıkar. Mermaid graph kodu ve cluster listesi olsun.\;
    
    const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': \Bearer \\ },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5
      })
    });
    
    const grokData = await grokRes.json();
    let content = grokData.choices[0].message.content.replace(/\\\json/g, '').replace(/\\\/g, '');
    const resultJson = JSON.parse(content);

    await supabase.from('profiles').update({ credits: profile.credits - 1 }).eq('id', session.user.id);
    await supabase.from('reports').insert({ user_id: session.user.id, keyword, result_json: resultJson });

    return NextResponse.json(resultJson);
  } catch (error) {
    return NextResponse.json({ error: 'Hata oluştu' }, { status: 500 });
  }
}
