'use client';
import { useState, useEffect } from 'react';
const API_URL = 'https://be-social-media-api-production.up.railway.app/api';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    name: '',
    username: '',
    phone: '',
    bio: '',
    avatarUrl: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMe() {
      const token =
        localStorage.getItem('token') ||
        localStorage.getItem('accessToken') ||
        '';
      const res = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const u = data.data || data.user || data;
      setUser(u);
      setForm({
        name: u.name || '',
        username: u.username || '',
        phone: u.phone || '',
        bio: u.bio || '',
        avatarUrl: u.avatar || '',
      });
    }
    getMe();
  }, []);

  async function handleUpdate(e: any) {
    e.preventDefault();
    setLoading(true);
    const token =
      localStorage.getItem('token') ||
      localStorage.getItem('accessToken') ||
      '';
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('username', form.username);
    fd.append('phone', form.phone);
    fd.append('bio', form.bio);
    if (file) fd.append('avatar', file);
    else if (form.avatarUrl) fd.append('avatarUrl', form.avatarUrl);

    const res = await fetch(`${API_URL}/me`, {
      method: 'PUT', // atau PATCH / POST tergantung BE kamu, coba PUT dulu
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    const result = await res.json();
    console.log('UPDATE RESULT:', result);
    alert('Profile updated!');
    setLoading(false);
  }

  if (!user)
    return (
      <div className='min-h-screen bg-black flex items-center justify-center text-white/50'>
        Loading profile...
      </div>
    );

  return (
    <div className='min-h-screen bg-black text-white p-6 flex justify-center'>
      <form
        onSubmit={handleUpdate}
        className='w-full max-w-[480px] flex flex-col gap-4'
      >
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : user.avatar || '/images/john-doe.jpg'
          }
          className='w-24 h-24 rounded-full object-cover mx-auto'
          alt=''
        />
        <input
          type='file'
          accept='image/png,image/jpeg,image/webp'
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className='text-[12px]'
        />
        <p className='text-[10px] text-white/40'>
          PNG/JPG/WEBP max 5MB (sesuai SS kamu)
        </p>

        <input
          placeholder='name'
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className='bg-zinc-900 border border-white/10 rounded-lg px-4 h-10 text-sm'
        />
        <input
          placeholder='username'
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className='bg-zinc-900 border border-white/10 rounded-lg px-4 h-10 text-sm'
        />
        <input
          placeholder='phone'
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className='bg-zinc-900 border border-white/10 rounded-lg px-4 h-10 text-sm'
        />
        <textarea
          placeholder='bio'
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className='bg-zinc-900 border border-white/10 rounded-lg p-4 text-sm h-24'
        />
        <input
          placeholder='avatarUrl - Alternative public URL if not uploading file'
          value={form.avatarUrl}
          onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
          className='bg-zinc-900 border border-white/10 rounded-lg px-4 h-10 text-sm'
        />

        <button
          disabled={loading}
          className='bg-[#8B5CF6] h-10 rounded-lg text-sm font-semibold'
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
