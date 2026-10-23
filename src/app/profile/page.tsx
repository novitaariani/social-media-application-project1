'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API}/users/${params.username}`);
        const json = await res.json();

        // Karena BE ngirim data sebagai STRING JSON, kita parse lagi
        let userData = json.data;
        if (typeof userData === 'string') {
          userData = JSON.parse(userData);
        }

        console.log('USER:', userData);
        setUser(userData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [params.username]);

  if (loading)
    return (
      <div className='bg-black min-h-screen text-white p-4'>Loading...</div>
    );
  if (!user)
    return (
      <div className='bg-black min-h-screen text-white p-4'>User not found</div>
    );

  return (
    <div className='bg-black min-h-screen text-white pb-[90px]'>
      <div className='max-w-[480px] mx-auto'>
        {/* Header sesuai API */}
        <div className='p-6 flex flex-col items-center text-center'>
          <img
            src={user.avatarUrl}
            className='w-24 h-24 rounded-full object-cover'
            alt={user.username}
          />
          <h1 className='font-bold text-[18px] mt-4'>{user.name}</h1>
          <p className='text-white/50 text-[13px]'>@{user.username}</p>
          <p className='text-white/70 text-[13px] mt-2 max-w-[300px]'>
            {user.bio}
          </p>

          {/* Counts dari API: post, followers, following, likes */}
          <div className='flex gap-6 mt-5'>
            <div className='text-center'>
              <p className='font-bold'>{user.counts?.post || 0}</p>
              <p className='text-white/50 text-[11px]'>Posts</p>
            </div>
            <div className='text-center'>
              <p className='font-bold'>{user.counts?.followers || 0}</p>
              <p className='text-white/50 text-[11px]'>Followers</p>
            </div>
            <div className='text-center'>
              <p className='font-bold'>{user.counts?.following || 0}</p>
              <p className='text-white/50 text-[11px]'>Following</p>
            </div>
            <div className='text-center'>
              <p className='font-bold'>{user.counts?.likes || 0}</p>
              <p className='text-white/50 text-[11px]'>Likes</p>
            </div>
          </div>

          <button className='mt-5 bg-white text-black px-6 py-2 rounded-full text-[13px] font-bold'>
            {user.isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
}
