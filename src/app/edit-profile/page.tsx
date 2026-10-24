'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Form = {
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
};
type Errors = Partial<Record<keyof Form, string>>;

export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState<Form>({
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@email.com',
    phone: '081234567890',
    bio: 'Create your bio',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [avatar, setAvatar] = useState('/images/john-doe.jpg');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof Form])
      setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.username.trim()) newErrors.username = 'Username is required';
    else if (form.username.length < 3)
      newErrors.username = 'Username must be at least 3 characters';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = 'Invalid email format';
    if (!form.phone.trim()) newErrors.phone = 'Number phone is required';
    else if (!/^[0-9]{10,15}$/.test(form.phone))
      newErrors.phone = 'Phone must be 10-15 digits';
    if (!form.bio.trim()) newErrors.bio = 'Bio is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(
        'https://be-social-media-api-production.up.railway.app/api/users/profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error('Failed to update');

      // INI KUNCI TOAST IJO MUNCUL DI PROFILE
      if (typeof window !== 'undefined') {
        localStorage.setItem('profile_updated', 'true');
      }
      router.push('/profile?updated=true');
    } catch {
      setErrors({ name: 'Failed to update, please try again' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof Form) =>
    `w-full bg-[#12141A] rounded-[8px] px-3 py-2.5 text-[11px] outline-none border transition
     ${errors[field] ? 'border-[#FF2D55]/70 focus:border-[#FF2D55]' : 'border-white/[0.06] focus:border-white/20'}`;

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='w-full h-[48px] bg-black border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-50'>
        <Link href='/timeline' className='flex items-center gap-2'>
          <Image
            src='/logo.png'
            width={20}
            height={20}
            alt='logo'
            unoptimized
          />
          <span className='font-bold text-[13px]'>Sociality</span>
        </Link>
        <div className='bg-[#1A1A1A] rounded-full px-4 py-1.5 w-[320px] hidden md:flex'>
          <input
            placeholder='Search'
            className='bg-transparent text-[11px] w-full outline-none placeholder:text-white/30'
          />
        </div>
        <div className='flex items-center gap-2'>
          <Image
            src='/images/john-doe.jpg'
            width={22}
            height={22}
            className='rounded-full object-cover'
            alt='John Doe'
            unoptimized
          />
          <span className='text-[11px]'>John Doe</span>
        </div>
      </div>

      <div className='max-w-[700px] mx-auto px-6 py-8'>
        <Link href='/profile' className='flex items-center gap-2 mb-8'>
          <span>←</span>
          <span className='text-[14px] font-semibold'>Edit Profile</span>
        </Link>

        <div className='flex flex-col md:flex-row gap-8'>
          <div className='flex flex-col items-center gap-3'>
            <Image
              src={avatar}
              width={72}
              height={72}
              className='rounded-full object-cover'
              alt='avatar'
              unoptimized
            />
            <label className='bg-[#1A1A1A] border border-white/10 rounded-full px-4 py-1.5 text-[10px] cursor-pointer hover:bg-white/10'>
              Change Photo
              <input
                type='file'
                accept='image/*'
                onChange={handlePhoto}
                className='hidden'
              />
            </label>
          </div>

          <div className='flex-1 space-y-4'>
            {(['name', 'username', 'email', 'phone'] as (keyof Form)[]).map(
              (field) => (
                <div key={field}>
                  <label className='text-[10px] text-white/60 block mb-1.5 capitalize'>
                    {field === 'phone' ? 'Number Phone' : field}
                  </label>
                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className={inputClass(field)}
                  />
                  {errors[field] && (
                    <p className='text-[9px] text-[#FF2D55] mt-1.5 ml-1'>
                      Text Helper
                    </p>
                  )}
                </div>
              )
            )}
            <div>
              <label className='text-[10px] text-white/60 block mb-1.5'>
                Bio
              </label>
              <textarea
                name='bio'
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className={inputClass('bio') + ' resize-none'}
              />
              {errors.bio && (
                <p className='text-[9px] text-[#FF2D55] mt-1.5 ml-1'>
                  Text Helper
                </p>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={loading}
              className='w-full bg-[#6D28D9] hover:bg-[#7C3AED] rounded-full py-2.5 text-[11px] font-semibold mt-2 transition'
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
