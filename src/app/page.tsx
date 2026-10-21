'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    api?: string;
  }>({});

  const validate = () => {
    const newErr: any = {};
    if (!email) newErr.email = 'Text Helper';
    if (!password) newErr.password = 'Text Helper';
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { email, password }
      );
      const token =
        res.data?.token || res.data?.data?.token || res.data?.access_token;
      if (token) localStorage.setItem('token', token);
      router.push('/feed');
    } catch (err: any) {
      setErrors({
        email: 'Text Helper',
        password: 'Text Helper',
        api: err.response?.data?.message || 'Invalid credentials',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full bg-black relative flex items-center justify-center p-4 overflow-hidden'>
      <div className='absolute bottom-0 left-0 w-full h-[65%] bg-gradient-to-t from-[#4F2CD9] via-[#5B2DD6]/40 to-transparent' />
      <div className='absolute bottom-0 left-0 w-full h-[40%] bg-[#7C3AED]/60 blur-[80px]' />

      <div className='relative z-10 w-full max-w-[360px] bg-[#111113]/80 backdrop-blur-xl border border-white/[0.06] rounded-[16px] p-8 shadow-2xl'>
        <div className='flex flex-col items-center mb-6'>
          <div className='flex items-center gap-2.5 mb-3'>
            {/* INI PAKAI LOGO.PNG KAMU YANG UDAH BENER */}
            <img
              src='/logo.png'
              alt='Sociality'
              className='w-[22px] h-[22px] object-contain'
            />
            <span className='text-white font-semibold text-[15px]'>
              Sociality
            </span>
          </div>
          <h1 className='text-white font-bold text-[14px]'>Welcome Back!</h1>
        </div>

        {errors.api && (
          <div className='bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] p-2.5 rounded-lg mb-4 text-center'>
            {errors.api}
          </div>
        )}

        <form onSubmit={handleLogin} className='space-y-4' noValidate>
          <div>
            <label className='text-[10px] font-medium text-white/70 mb-1.5 block'>
              Email
            </label>
            <input
              type='text'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-[8px] bg-[#1A1A1F] text-[12px] text-white placeholder:text-white/30 border outline-none
                ${errors.email ? 'border-[#FF3B5C]/60 bg-[#1F1215]' : 'border-white/10 focus:border-[#7C3AED]/60'}`}
            />
            {errors.email && (
              <p className='text-[#FF3B5C] text-[10px] mt-1.5'>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className='text-[10px] font-medium text-white/70 mb-1.5 block'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-[8px] bg-[#1A1A1F] text-[12px] text-white placeholder:text-white/30 border outline-none pr-9
                  ${errors.password ? 'border-[#FF3B5C]/60 bg-[#1F1215]' : 'border-white/10 focus:border-[#7C3AED]/60'}`}
              />
              <button
                type='button'
                onClick={() => setShowPass(!showPass)}
                className='absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 text-[12px]'
              >
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            {errors.password && (
              <p className='text-[#FF3B5C] text-[10px] mt-1.5'>
                {errors.password}
              </p>
            )}
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full mt-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-2.5 rounded-full text-[12px] font-semibold transition'
          >
            {loading ? '...' : 'Login'}
          </button>
        </form>

        <p className='text-[10px] text-center mt-4 text-white/50'>
          Don't have an account?{' '}
          <a href='/register' className='text-[#8B5CF6] font-medium'>
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
