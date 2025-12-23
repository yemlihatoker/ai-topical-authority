import Link from 'next/link';

export default function Pricing() {
  return (
    <div className='py-20 px-4 text-center min-h-screen bg-gray-50'>
      <Link href='/' className='absolute top-8 left-8 text-blue-600 font-bold'>&larr; Geri Dön</Link>
      <h1 className='text-4xl font-bold mb-12'>Paketler</h1>
      <div className='flex flex-wrap justify-center gap-8'>
        
        {/* Basic Paket */}
        <div className='bg-white border rounded-xl p-8 w-80 shadow-lg hover:shadow-xl transition'>
          <h2 className='text-2xl font-bold'>Basic</h2>
          <div className='text-4xl font-bold my-4'></div>
          <p className='text-gray-600 mb-6'>20 Sorgu Hakkı</p>
          <button className='block w-full bg-blue-600 text-white py-3 rounded-lg font-bold opacity-50 cursor-not-allowed'>Yakında</button>
        </div>

        {/* Pro Paket */}
        <div className='bg-slate-900 text-white border rounded-xl p-8 w-80 shadow-lg transform scale-105'>
          <h2 className='text-2xl font-bold'>Pro</h2>
          <div className='text-4xl font-bold my-4'></div>
          <p className='text-gray-400 mb-6'>100 Sorgu Hakkı</p>
          <button className='block w-full bg-white text-black py-3 rounded-lg font-bold opacity-50 cursor-not-allowed'>Yakında</button>
        </div>

      </div>
      <p className='mt-8 text-gray-500 text-sm'>Ödeme sistemi test aşamasındadır.</p>
    </div>
  )
}
