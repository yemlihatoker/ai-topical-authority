'use client';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const supabase = createClientComponentClient();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    // Güvenlik notu: Gerçek projede bu kontrolü backend tarafında da yapmalısın
    if (session) { 
        setIsAdmin(true);
        fetchUsers();
    } else {
        window.location.href = '/login';
    }
  };

  const fetchUsers = async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (data) setUsers(data);
  };

  const addCredits = async (userId: string, currentCredits: number) => {
    await supabase.from('profiles').update({ credits: currentCredits + 10 }).eq('id', userId);
    fetchUsers();
  };

  if (!isAdmin) return <div className='p-8'>Yetki Kontrolü yapılıyor...</div>;

  return (
    <div className='p-8 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-8'>Admin Paneli</h1>
      <div className='bg-white shadow rounded-lg overflow-hidden'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Email</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Kredi</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>İşlem</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {users.map((user) => (
              <tr key={user.id}>
                <td className='px-6 py-4'>{user.email}</td>
                <td className='px-6 py-4 font-bold'>{user.credits}</td>
                <td className='px-6 py-4'>
                  <button onClick={() => addCredits(user.id, user.credits || 0)} className='bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600'>+10 Kredi</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
