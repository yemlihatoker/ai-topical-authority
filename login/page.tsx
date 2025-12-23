'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const supabase = createClientComponentClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: \\/auth/callback\ } });
    alert('E-postanıza sihirli link gönderildi!');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className='text-2xl font-bold mb-4'>Giriş Yap</h1>
      <input className='border p-2 rounded mb-2 w-64' placeholder='E-posta' value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={handleLogin} className='bg-blue-600 text-white px-4 py-2 rounded w-64'>Sihirli Link Gönder</button>
    </div>
  );
}
