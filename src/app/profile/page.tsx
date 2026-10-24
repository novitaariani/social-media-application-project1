'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Post = {
  id: string;
  imageUrl?: string;
  image?: string;
  photo?: string;
  mediaUrl?: string;
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'saved'>('gallery');
  const [showSuccess, setShowSuccess] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (
      params.get('updated') === 'true' ||
      localStorage.getItem('profile_updated') === 'true'
    ) {
      setShowSuccess(true);
      localStorage.removeItem('profile_updated');
      window.history.replaceState({}, '', '/profile');
      setTimeout(() => setShowSuccess(false), 3000);
    }

    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          'https://be-social-media-api-production.up.railway.app/api/posts/my-posts',
          {
            headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          }
        );
        const data = await res.json();
        const list = data.posts || data.data || data.result || [];
        console.log('MY POSTS:', list); // CEK DI CONSOLE F12 KAWAN
        setPosts(Array.isArray(list) ? list : []);
      } catch {
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  const getImageSrc = (p: Post) => {
    // COVER SEMUA KEMUNGKINAN NAMA FIELD DARI API KAMU
    return p.imageUrl || p.image || p.photo || p.mediaUrl || '';
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // KALAU GAMBAR API BROKEN, GANTI KE PLACEHOLDER PASTI ADA
    e.currentTarget.src = `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 100)}`;
  };

  const displayImages = posts.length > 0 ? posts : [];

  return (
    <div className='min-h-screen bg-black text-white pb-[80px]'>
      <div className='w-full h-[48px] bg-black border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-40'>
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

      {showSuccess && (
        <div className='fixed top-[56px] right-6 z-[60]'>
          <div className='bg-[#00C950]/90 border border-[#00C950] text-white px-4 py-2 rounded-[8px] flex items-center gap-3 text-[10px] font-medium'>
            <span>Profile Success Update</span>
            <button onClick={() => setShowSuccess(false)}>✕</button>
          </div>
        </div>
      )}

      <div className='max-w-[720px] mx-auto px-6 pt-6'>
        <div className='flex justify-between items-start'>
          <div className='flex gap-3'>
            <Image
              src='/images/john-doe.jpg'
              width={40}
              height={40}
              className='rounded-full object-cover'
              alt='John Doe'
              unoptimized
            />
            <div>
              <p className='text-[12px] font-semibold leading-none'>John Doe</p>
              <p className='text-[10px] text-white/40 mt-1'>johndoe</p>
            </div>
          </div>
          <Link
            href='/edit-profile'
            className='bg-[#1A1A1A] border border-white/10 rounded-full px-4 py-1.5 text-[10px]'
          >
            Edit Profile
          </Link>
        </div>

        <p className='text-[10px] text-white/60 mt-3'>
          Creating unforgettable moments with my favorite person! ✨ Let&apos;s
          cherish every second together!
        </p>

        <div className='grid grid-cols-4 mt-5 border-y border-white/[0.06] py-3'>
          <div className='text-center border-r border-white/[0.06]'>
            <p className='text-[11px] font-bold'>{posts.length || 1}</p>
            <p className='text-[9px] text-white/40'>Post</p>
          </div>
          <div className='text-center border-r border-white/[0.06]'>
            <p className='text-[11px] font-bold'>100</p>
            <p className='text-[9px] text-white/40'>Followers</p>
          </div>
          <div className='text-center border-r border-white/[0.06]'>
            <p className='text-[11px] font-bold'>43</p>
            <p className='text-[9px] text-white/40'>Following</p>
          </div>
          <div className='text-center'>
            <p className='text-[11px] font-bold'>567</p>
            <p className='text-[9px] text-white/40'>Likes</p>
          </div>
        </div>

        <div className='flex justify-center gap-8 mt-3 border-b border-white/[0.06]'>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`pb-2 text-[10px] border-b ${activeTab === 'gallery' ? 'border-white text-white' : 'border-transparent text-white/40'}`}
          >
            ⊞ Gallery
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-2 text-[10px] border-b ${activeTab === 'saved' ? 'border-white text-white' : 'border-transparent text-white/40'}`}
          >
            ♡ Saved
          </button>
        </div>

        {/* INI KUNCI BIAR GAK HITAM LAGI */}
        <div className='grid grid-cols-3 gap-[2px] mt-3'>
          {displayImages.length > 0 ? (
            displayImages.map((p, i) => {
              const src = getImageSrc(p);
              return (
                <div
                  key={p.id || i}
                  className='aspect-square bg-[#111] overflow-hidden relative'
                >
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src}
                      alt={`post ${i}`}
                      onError={handleImgError}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://picsum.photos/400/400?random=${i + 10}`}
                      alt={`post ${i}`}
                      className='w-full h-full object-cover'
                    />
                  )}
                </div>
              );
            })
          ) : (
            // KALAU BELUM ADA POST SAMA SEKALI
            <div className='col-span-3 text-center py-20'>
              <p className='text-[12px] text-white/40'>No posts yet</p>
              <Link
                href='/create'
                className='inline-block mt-3 bg-[#6D28D9] rounded-full px-6 py-2 text-[11px]'
              >
                Create your first post
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className='fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1A1A] border border-white/10 rounded-full px-8 py-3 flex items-center gap-8 z-50'>
        <Link href='/timeline' className='flex flex-col items-center gap-1'>
          <span className='text-[14px] text-white/40'>⌂</span>
          <span className='text-[9px] text-white/40'>Home</span>
        </Link>
        <Link
          href='/create'
          className='w-8 h-8 bg-[#6D28D9] rounded-full flex items-center justify-center'
        >
          +
        </Link>
        <Link href='/profile' className='flex flex-col items-center gap-1'>
          <span className='text-[14px] text-[#6D28D9]'>●</span>
          <span className='text-[9px] text-white'>Profile</span>
        </Link>
      </div>
    </div>
  );
}
