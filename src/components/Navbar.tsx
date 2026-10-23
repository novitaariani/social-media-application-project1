'use client';

export default function Navbar() {
  return (
    <nav className='h-[56px] bg-black border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-50'>
      <div className='flex items-center gap-2'>
        <img src='/logo.png' className='w-6 h-6 object-contain' alt='logo' />
        <span className='font-bold text-white'>Sociality</span>
      </div>
      <div className='w-[380px] h-8 bg-[#1A1A1A] rounded-full flex items-center px-4 text-xs text-white/40'>
        ⌕ Search
      </div>
      <div className='flex items-center gap-2.5'>
        <img
          src='/images/john-doe.jpg'
          className='w-8 h-8 rounded-full object-cover'
          alt='John Doe'
        />
        <span className='text-[13px] text-white'>John Doe</span>
      </div>
    </nav>
  );
}
