'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setErrors({ confirm: "Passwords don't match" });
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      // SESUAI DOC: POST /api/auth/register
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        name: form.name,
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      alert('Register sukses!');
      router.push('/');
    } catch (err: any) {
      setErrors({
        api:
          err.response?.data?.message ||
          JSON.stringify(err.response?.data) ||
          'Register gagal',
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-3 py-2.5 rounded-[8px] bg-[#1A1A1F] text-[12px] text-white placeholder:text-white/30 border outline-none transition
    ${hasError ? 'border-[#FF3B5C]/60 bg-[#1F1215]' : 'border-white/10 focus:border-[#7C3AED]/60'}`;

  return (
    <div className='min-h-screen w-full bg-black relative flex items-center justify-center p-4 overflow-hidden py-10'>
      <div className='absolute bottom-0 left-0 w-full h-[65%] bg-gradient-to-t from-[#4F2CD9] via-[#5B2DD6]/40 to-transparent pointer-events-none' />
      <div className='absolute bottom-0 left-0 w-full h-[40%] bg-[#7C3AED]/60 blur-[80px] pointer-events-none' />

      <div className='relative z-10 w-full max-w-[380px] bg-[#111113]/80 backdrop-blur-xl border border-white/[0.06] rounded-[16px] p-8 shadow-2xl'>
        <div className='flex flex-col items-center mb-6'>
          <div className='flex items-center gap-2.5 mb-3'>
            <img
              src='/logo.png'
              alt='Sociality'
              className='w-[22px] h-[22px] object-contain'
            />
            <span className='text-white font-semibold text-[15px]'>
              Sociality
            </span>
          </div>
          <h1 className='text-white font-bold text-[14px]'>Create Account</h1>
        </div>

        {errors.api && (
          <div className='bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] p-2.5 rounded-lg mb-4 text-center break-words'>
            {errors.api}
          </div>
        )}

        <form onSubmit={handleRegister} className='space-y-3.5'>
          <div>
            <label className='text-[10px] text-white/70 block mb-1.5'>
              Full Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder='John Doe'
              className={inputClass(false)}
              required
            />
          </div>
          <div>
            <label className='text-[10px] text-white/70 block mb-1.5'>
              Username
            </label>
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder='johndoe'
              className={inputClass(false)}
              required
            />
          </div>
          <div>
            <label className='text-[10px] text-white/70 block mb-1.5'>
              Email
            </label>
            <input
              type='email'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder='john@email.com'
              className={inputClass(false)}
              required
            />
          </div>
          <div>
            <label className='text-[10px] text-white/70 block mb-1.5'>
              Phone
            </label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder='081234567890'
              className={inputClass(false)}
              required
            />
          </div>
          <div>
            <label className='text-[10px] text-white/70 block mb-1.5'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder='secret123'
                className={`${inputClass(false)} pr-9`}
                required
              />
              <button
                type='button'
                onClick={() => setShowPass(!showPass)}
                className='absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 text-[12px]'
              >
                👁
              </button>
            </div>
          </div>
          <div>
            <label className='text-[10px] text-white/70 block mb-1.5'>
              Confirm Password
            </label>
            <input
              type='password'
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              placeholder='Confirm password'
              className={inputClass(!!errors.confirm)}
              required
            />
            {errors.confirm && (
              <p className='text-[#FF3B5C] text-[10px] mt-1.5'>
                {errors.confirm}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            className='w-full mt-2 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-white py-2.5 rounded-full text-[12px] font-semibold'
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className='text-[10px] text-center mt-5 text-white/50'>
          Already have an account?{' '}
          <Link href='/' className='text-[#8B5CF6] font-medium'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
