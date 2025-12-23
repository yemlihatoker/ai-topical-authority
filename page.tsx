'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import mermaid from 'mermaid';

export default function Dashboard() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState(0);
  const supabase = createClientComponentClient();

  useEffect(() => {
    getUser();
    mermaid.initialize({ startOnLoad: true });
  }, []);

  useEffect(() => {
    if (result?.mermaid) mermaid.contentLoaded();
  }, [result]);

  const getUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setUser(session.user);
      const { data } = await supabase.from('profiles').select('credits').eq('id', session.user.id).single();
      if (data) setCredits(data.credits);
    }
  };

  const handleGenerate = async () => {
    if (!keyword) return;
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ keyword })
    });
    const data = await res.json();
    if (data.error) alert(data.error);
    else {
      setResult(data);
      getUser();
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-slate-900 text-white'>
        <h1 className='text-5xl font-bold mb-4'>Ai Topical Authority</h1>
        <button onClick={() => window.location.href='/login'} className='bg-blue-600 px-8 py-3 rounded-lg font-bold'>Giriş Yap</button>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <nav className='flex justify-between items-center mb-10 bg-white p-4 rounded-xl shadow-sm'>
        <div className='font-bold text-xl'>Ai Topical Authority</div>
        <div className='flex gap-4 items-center'>
          <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium'>{credits} Kredi</span>
          <a href='/pricing' className='text-blue-600 font-semibold'>Paket Al</a>
        </div>
      </nav>
      <div className='max-w-4xl mx-auto'>
        <div className='flex gap-4 mb-8'>
          <input className='flex-1 p-4 rounded-lg border' placeholder='Anahtar kelime...' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <button onClick={handleGenerate} disabled={loading} className='bg-black text-white px-8 rounded-lg font-bold'>{loading ? '...' : 'Oluştur'}</button>
        </div>
        {result && (
          <div className='bg-white p-8 rounded-xl shadow-lg'>
            <h2 className='text-2xl font-bold mb-4'>{result.title}</h2>
            <div className='mermaid mb-8 bg-gray-50 p-4 rounded border'>{result.mermaid}</div>
            <pre className='bg-gray-100 p-4 rounded overflow-auto text-sm'>{JSON.stringify(result.clusters, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
