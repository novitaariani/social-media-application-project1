'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type LoginForm = {
  email: string;
  password: string;
};

export default function HomePage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        'https://be-social-media-api-production.up.railway.app/api/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      const data = (await res.json()) as { token?: string };
      if (data.token) {
        localStorage.setItem('token', data.token);
        router.push('/timeline');
      }
    } catch (error) {
      console.log('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-black flex items-center justify-center p-6'>
      <div className='w-full max-w-[360px] space-y-6'>
        <div className='flex items-center gap-2 justify-center'>
          <Image
            src='/logo.png'
            width={28}
            height={28}
            alt='Sociality logo'
            unoptimized
          />
          <span className='font-bold text-[20px] text-white'>Sociality</span>
        </div>
        <form onSubmit={handleLogin} className='space-y-4'>
          <input
            name='email'
            value={form.email}
            onChange={handleChange}
            placeholder='Email'
            className='w-full bg-[#1E1E1E] border border-white/10 rounded-full px-5 py-3 text-[13px] text-white outline-none placeholder:text-white/30'
          />
          <input
            name='password'
            type='password'
            value={form.password}
            onChange={handleChange}
            placeholder='Password'
            className='w-full bg-[#1E1E1E] border border-white/10 rounded-full px-5 py-3 text-[13px] text-white outline-none placeholder:text-white/30'
          />
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-white text-black rounded-full py-3 text-[13px] font-bold'
          >
            {loading ? 'Loading...' : 'Log In'}
          </button>
        </form>
        <p className='text-center text-[11px] text-white/40'>
          Do not have an account? Sign up
        </p>
      </div>
    </div>
  );
}
