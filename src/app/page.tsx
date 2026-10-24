'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#fafafa]'>
      <div className='w-full max-w-[350px] flex flex-col gap-4'>
        {/* Logo Card */}
        <div className='bg-white border border-gray-300 p-10 flex flex-col items-center'>
          <h1
            className='text-4xl font-bold mb-8'
            style={{ fontFamily: 'cursive' }}
          >
            Sociality
          </h1>

          <input
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full bg-[#fafafa] border border-gray-300 rounded-sm px-2 py-2 text-sm mb-2 focus:outline-none'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full bg-[#fafafa] border border-gray-300 rounded-sm px-2 py-2 text-sm mb-4 focus:outline-none'
          />
          <button className='w-full bg-[#0095f6] text-white rounded-lg py-1.5 text-sm font-semibold'>
            Log In
          </button>

          <div className='flex items-center w-full my-4'>
            <div className='flex-1 h-[1px] bg-gray-300'></div>
            <span className='px-3 text-xs text-gray-500 font-semibold'>OR</span>
            <div className='flex-1 h-[1px] bg-gray-300'></div>
          </div>

          <Link
            href='/timeline'
            className='text-sm text-[#385185] font-semibold'
          >
            Continue to Timeline
          </Link>
        </div>

        <div className='bg-white border border-gray-300 p-5 text-center text-sm'>
          Do not have an account?{' '}
          <Link href='/register' className='text-[#0095f6] font-semibold'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
