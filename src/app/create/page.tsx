'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';

const API_URL = 'https://be-social-media-api-production.up.railway.app/api';

export default function CreatePage() {
  const router = useRouter();
  const [caption, setCaption] = useState(
    "Creating unforgettable moments with my favorite person! 📸 ✨ Let's cherish every second together!"
  );
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  function onFile(e: any) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handlePost() {
    setLoading(true);
    try {
      const token =
        localStorage.getItem('token') ||
        localStorage.getItem('accessToken') ||
        '';
      const fd = new FormData();
      fd.append('caption', caption);
      fd.append('content', caption);
      if (file) fd.append('image', file);

      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      console.log('CREATE:', data);
      if (res.ok) {
        alert('Post berhasil!');
        router.push('/timeline');
      } else alert(data.message || 'Gagal post');
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-black pb-[120px]'>
      <Navbar />
      <div className='w-full flex justify-center'>
        <div className='w-full max-w-[480px] px-6 py-6'>
          <div className='flex justify-between items-center mb-6'>
            <button onClick={() => router.back()} className='text-white'>
              ✕
            </button>
            <p className='text-white font-semibold text-[14px]'>Create Post</p>
            <button
              onClick={handlePost}
              disabled={loading}
              className='text-[#8B5CF6] text-[13px] font-semibold'
            >
              {loading ? '...' : 'Post'}
            </button>
          </div>

          <div className='flex items-center gap-2 mb-4'>
            <img
              src='/images/john-doe.jpg'
              className='w-8 h-8 rounded-full'
              alt=''
            />
            <p className='text-white text-[13px] font-semibold'>Johndoe</p>
          </div>

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className='w-full bg-transparent text-white text-[14px] outline-none min-h-[100px] resize-none'
            placeholder="What's on your mind?"
          />

          {preview && (
            <div className='mt-4 rounded-xl overflow-hidden relative'>
              <img src={preview} className='w-full h-auto' alt='' />
              <button
                onClick={() => {
                  setFile(null);
                  setPreview('');
                }}
                className='absolute top-2 right-2 w-7 h-7 bg-black/70 rounded-full text-white'
              >
                ✕
              </button>
            </div>
          )}

          <label className='mt-6 w-full h-[140px] border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-[#121214]'>
            <span className='text-white/40 text-[22px]'>+</span>
            <span className='text-white/50 text-[12px]'>Add Photo</span>
            <input
              type='file'
              hidden
              accept='image/png,image/jpeg,image/webp'
              onChange={onFile}
            />
          </label>

          <button
            onClick={handlePost}
            disabled={loading}
            className='mt-8 w-full bg-[#8B5CF6] h-11 rounded-full text-white text-[13px] font-semibold'
          >
            {loading ? 'Posting...' : 'Share Post'}
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
