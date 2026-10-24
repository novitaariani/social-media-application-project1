'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('novita95new@gmail.com');
  const [password, setPassword] = useState('Kitabisa@');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        'https://be-social-media-api-production.up.railway.app/api/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login gagal');
      const token = data.token || data.data?.token || data.data?.data?.token;
      localStorage.setItem('token', token);
      localStorage.setItem('access_token', token);
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem(
        'user',
        JSON.stringify(data.data?.user || data.user || { email })
      );
      router.push('/timeline');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center relative bg-black overflow-hidden'>
      {/* Gradient ungu bawah kayak Figma */}
      <div className='absolute inset-0 bg-gradient-to-t from-[#6d28d9] via-[#3a1a6e]/50 to-black' />
      <div className='absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#7c3aed]/80 to-transparent blur-[1px]' />

      {/* CARD */}
      <div className='relative z-10 w-[340px] bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl'>
        {/* Logo */}
        <div className='flex items-center justify-center gap-2 mb-4'>
          <img src='/logo.png' alt='logo' className='w-5 h-5 invert' />
          <span className='text-white font-semibold text-[14px]'>
            Sociality
          </span>
        </div>

        <h1 className='text-white text-center font-bold text-[14px] mb-5'>
          Welcome Back!
        </h1>

        <form onSubmit={handleLogin} className='space-y-3'>
          <div>
            <label className='text-[9px] text-white/80 mb-1 block'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-full px-3 py-2.5 rounded-lg bg-[#1a1a1f] border border-white/10 text-[11px] text-white placeholder:text-gray-500 outline-none focus:border-[#7c3aed]'
              required
            />
          </div>

          <div>
            <label className='text-[9px] text-white/80 mb-1 block'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                className='w-full px-3 py-2.5 pr-8 rounded-lg bg-[#1a1a1f] border border-white/10 text-[11px] text-white placeholder:text-gray-500 outline-none focus:border-[#7c3aed]'
                required
              />
              <button
                type='button'
                onClick={() => setShowPass(!showPass)}
                className='absolute right-2.5 top-2.5 text-gray-400 text-[12px]'
              >
                👁️
              </button>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full mt-2 py-2.5 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-[11px] font-semibold transition'
          >
            {loading ? '...' : 'Login'}
          </button>
        </form>

        <p className='text-[9px] text-gray-400 text-center mt-4'>
          Don't have an account?{' '}
          <Link href='/register' className='text-[#7c3aed] hover:underline'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
