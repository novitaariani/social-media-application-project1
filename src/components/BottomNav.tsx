'use client';
import { useRouter } from 'next/navigation';
export default function BottomNav() {
  const router = useRouter();
  return (
    <div className='fixed bottom-6 left-1/2 -translate-x-1/2 z-50'>
      <div className='bg-[#1E1E20] border border-white/10 rounded-full px-8 py-3 flex items-center gap-10'>
        <button
          onClick={() => router.push('/timeline')}
          className='flex flex-col items-center'
        >
          <img src='/home.png' className='w-5 h-5' alt='' />
          <span className='text-[10px] text-white/60'>Home</span>
        </button>
        <button
          onClick={() => router.push('/create')}
          className='w-9 h-9 bg-[#8B5CF6] rounded-full flex items-center justify-center text-white text-xl'
        >
          +
        </button>
        <button
          onClick={() => router.push('/profile')}
          className='flex flex-col items-center'
        >
          <img src='/profile.png' className='w-5 h-5' alt='' />
          <span className='text-[10px] text-[#8B5CF6]'>Profile</span>
        </button>
      </div>
    </div>
  );
}
