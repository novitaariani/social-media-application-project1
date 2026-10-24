'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className='w-full h-[56px] bg-black border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-50'>
      <Link href='/timeline' className='flex items-center gap-2'>
        <Image src='/logo.png' width={24} height={24} alt='logo' unoptimized />
        <span className='font-bold text-[14px] text-white'>Sociality</span>
      </Link>

      <div className='bg-[#1E1E1E] rounded-full px-5 py-2.5 w-[340px] hidden md:block border border-white/[0.06]'>
        <input
          placeholder='Search'
          className='bg-transparent text-[12px] w-full outline-none text-white placeholder:text-white/30'
        />
      </div>

      <div className='flex items-center gap-3'>
        <Link href='/profile' className='flex items-center gap-2'>
          <Image
            src='/images/john-doe.jpg'
            width={28}
            height={28}
            className='rounded-full object-cover'
            alt='John Doe'
            unoptimized
          />
          <span className='text-[12px] text-white'>John Doe</span>
        </Link>
        <button
          onClick={handleLogout}
          className='text-[11px] text-white/40 hover:text-white ml-2'
        >
          Logout
        </button>
      </div>
    </div>
  );
}
