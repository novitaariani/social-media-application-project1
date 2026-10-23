'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://be-social-media-api-production.up.railway.app';

type UserProfile = {
  username: string;
  fullname: string;
  bio: string;
  avatar: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing?: boolean;
};

export default function ProfilePage() {
  const { username } = useParams() as { username: string };
  const [user, setUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [tab, setTab] = useState<'posts' | 'likes'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  // GET /api/users/{username} - sesuai Swagger
  useEffect(() => {
    fetch(`${API}/api/users/${username}`)
      .then((r) => r.json())
      .then((json) => {
        const u = json.data || json.user || json;
        setUser({
          username: u.username || username,
          fullname: u.fullname || u.name || 'John Doe',
          bio:
            u.bio ||
            'Creating unforgettable moments with my favorite person! 📸✨',
          avatar: u.avatar || u.avatarUrl || '/images/john-doe.jpg',
          postsCount: u.postsCount || 20,
          followersCount: u.followersCount || 202,
          followingCount: u.followingCount || 20,
          isFollowing: u.isFollowing || false,
        });
        setIsFollowing(u.isFollowing || u.is_following || false);
      })
      .catch(() => {
        // fallback Figma dummy
        setUser({
          username: username || 'johndoe',
          fullname: 'John Doe',
          bio: 'Creating unforgettable moments with my favorite person! 📸✨ #Memories #Bestie #Adventure',
          avatar: '/images/john-doe.jpg',
          postsCount: 20,
          followersCount: 202,
          followingCount: 20,
        });
      });

    // GET /api/users/{username}/posts
    fetch(`${API}/api/users/${username}/posts?page=1&limit=20`)
      .then((r) => r.json())
      .then((json) => setPosts(json.data || json.posts || []))
      .catch(() =>
        setPosts([
          { id: '1', image: 'kids.jpg' },
          { id: '2', image: 'nature.jpg' },
          { id: '3', image: 'kids.jpg' },
          { id: '4', image: 'nature.jpg' },
          { id: '5', image: 'kids.jpg' },
          { id: '6', image: 'nature.jpg' },
        ])
      );

    // GET /api/users/{username}/likes
    fetch(`${API}/api/users/${username}/likes?page=1&limit=20`)
      .then((r) => r.json())
      .then((json) => setLikes(json.data || json.likes || []))
      .catch(() => setLikes([]));
  }, [username]);

  // POST /api/users/{username}/follow - Follow Action
  const handleFollow = async () => {
    setIsFollowing(!isFollowing); // optimistic
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      await fetch(`${API}/api/users/${username}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
    } catch (e) {
      console.log('follow failed');
    }
  };

  if (!user)
    return (
      <div className='min-h-screen bg-black flex items-center justify-center text-white/40'>
        Loading...
      </div>
    );

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar />
      <main className='max-w-[700px] mx-auto pt-8 pb-20 px-4'>
        {/* Header Profile - Figma Style */}
        <div className='flex gap-6 items-start'>
          <img
            src={user.avatar}
            className='w-20 h-20 md:w-28 md:h-28 rounded-full object-cover'
            alt=''
          />
          <div className='flex-1'>
            <div className='flex items-center gap-4'>
              <h1 className='text-[18px] font-bold'>{user.username}</h1>
              {isFollowing ? (
                <button
                  onClick={handleFollow}
                  className='h-8 px-4 rounded-full bg-[#1E1E1E] border border-white/10 text-[12px] font-medium flex items-center gap-1.5'
                >
                  ✓ Following
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className='h-8 px-6 rounded-full bg-[#7C5CFF] text-white text-[12px] font-bold'
                >
                  Follow
                </button>
              )}
            </div>

            <div className='flex gap-6 mt-4'>
              <div>
                <span className='font-bold text-[14px]'>{user.postsCount}</span>{' '}
                <span className='text-white/60 text-[13px]'>Posts</span>
              </div>
              <div>
                <span className='font-bold text-[14px]'>
                  {user.followersCount}
                </span>{' '}
                <span className='text-white/60 text-[13px]'>Followers</span>
              </div>
              <div>
                <span className='font-bold text-[14px]'>
                  {user.followingCount}
                </span>{' '}
                <span className='text-white/60 text-[13px]'>Following</span>
              </div>
            </div>

            <div className='mt-4'>
              <p className='text-[14px] font-bold'>{user.fullname}</p>
              <p className='text-[13px] text-white/60 mt-1 leading-[18px]'>
                {user.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs - Figma: Posts / Likes */}
        <div className='flex border-t border-white/10 mt-8'>
          <button
            onClick={() => setTab('posts')}
            className={`flex-1 h-12 text-[13px] font-bold tracking-wide flex items-center justify-center gap-2 ${tab === 'posts' ? 'border-t border-white text-white' : 'text-white/40'}`}
          >
            <span className='text-[14px]'>⊞</span> POSTS
          </button>
          <button
            onClick={() => setTab('likes')}
            className={`flex-1 h-12 text-[13px] font-bold tracking-wide flex items-center justify-center gap-2 ${tab === 'likes' ? 'border-t border-white text-white' : 'text-white/40'}`}
          >
            <span className='text-[14px]'>♡</span> LIKES
          </button>
        </div>

        {/* Grid 3 kolom - Figma */}
        <div className='grid grid-cols-3 gap-1 mt-1'>
          {(tab === 'posts' ? posts : likes.length ? likes : posts).map(
            (p, i) => (
              <div
                key={i}
                className='aspect-square bg-zinc-900 overflow-hidden'
              >
                <img
                  src={
                    p.image?.startsWith('http') ||
                    p.image?.startsWith('/images')
                      ? p.image
                      : `/images/${p.image || 'kids.jpg'}`
                  }
                  className='w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer'
                  alt=''
                />
              </div>
            )
          )}
        </div>

        {tab === 'likes' && likes.length === 0 && (
          <p className='text-center text-white/30 text-[12px] mt-10'>
            No liked posts yet
          </p>
        )}
      </main>
    </div>
  );
}
