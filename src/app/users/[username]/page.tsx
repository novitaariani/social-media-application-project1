'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function FriendsProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [tab, setTab] = useState('gallery');
  const [loading, setLoading] = useState(true);

  const galleryImages = [
    '/images/kids.jpg',
    '/images/nature.jpg',
    '/images/home.jpg',
    '/images/kids.jpg',
    '/images/nature.jpg',
    '/images/party.jpg',
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      const token =
        localStorage.getItem('token') || localStorage.getItem('access_token');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const res = await fetch(
          'https://be-social-media-api-production.up.railway.app/api/users/' +
            username,
          {
            headers: { Authorization: 'Bearer ' + token },
          }
        );
        if (res.ok) {
          const data = await res.json();
          const u = data.data || data;
          setUserData(u);
          setIsFollowing(u.is_following || false);
        } else {
          setUserData({
            name: 'John Doe',
            username: username,
            bio: "Creating unforgettable moments with my favorite person! Let's cherish every second together!",
            posts: 50,
            followers: 100,
            following: 43,
            likes: 567,
            avatar: '/images/john-doe.jpg',
          });
        }
      } catch {
        setUserData({
          name: 'John Doe',
          username: username,
          bio: "Creating unforgettable moments with my favorite person! Let's cherish every second together!",
          posts: 50,
          followers: 100,
          following: 43,
          likes: 567,
          avatar: '/images/john-doe.jpg',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username, router]);

  const handleFollow = async () => {
    const token =
      localStorage.getItem('token') || localStorage.getItem('access_token');
    setLoadingFollow(true);
    try {
      const endpoint = isFollowing ? 'unfollow' : 'follow';
      const res = await fetch(
        'https://be-social-media-api-production.up.railway.app/api/users/' +
          username +
          '/' +
          endpoint,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok || res.status === 404) {
        setIsFollowing(!isFollowing);
      }
    } catch {
      setIsFollowing(!isFollowing);
    } finally {
      setLoadingFollow(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-black text-white flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <header className='flex items-center justify-between px-6 py-3 bg-black border-b border-white/10'>
        <Link href='/timeline' className='flex items-center gap-2'>
          <img src='/logo.png' alt='logo' className='w-4 h-4 invert' />
          <span className='text-[12px] font-semibold'>Sociality</span>
        </Link>
        <div className='flex items-center gap-4'>
          <input
            placeholder='Search'
            className='w-48 bg-[#111] rounded-full px-4 py-1 text-[11px] outline-none'
          />
          <img
            src='/images/john-doe.jpg'
            alt='me'
            className='w-6 h-6 rounded-full'
          />
        </div>
      </header>

      <div className='max-w-[600px] mx-auto pt-6 px-6'>
        <div className='flex gap-4 items-start'>
          <img
            src={userData?.avatar || '/images/john-doe.jpg'}
            alt='avatar'
            className='w-12 h-12 rounded-full object-cover'
          />
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <h2 className='text-[13px] font-bold'>{userData?.name}</h2>
              {isFollowing && (
                <span className='text-[9px] px-2 py-0.5 rounded-full bg-white/10 border border-white/20'>
                  Following
                </span>
              )}
            </div>
            <p className='text-[10px] text-gray-400'>@{userData?.username}</p>
            <p className='text-[10px] mt-2 text-gray-300 max-w-[340px]'>
              {userData?.bio}
            </p>
            <div className='flex gap-6 mt-4'>
              <div className='text-center'>
                <p className='text-[12px] font-bold'>{userData?.posts}</p>
                <p className='text-[9px] text-gray-400'>Post</p>
              </div>
              <div className='text-center'>
                <p className='text-[12px] font-bold'>{userData?.followers}</p>
                <p className='text-[9px] text-gray-400'>Followers</p>
              </div>
              <div className='text-center'>
                <p className='text-[12px] font-bold'>{userData?.following}</p>
                <p className='text-[9px] text-gray-400'>Following</p>
              </div>
              <div className='text-center'>
                <p className='text-[12px] font-bold'>{userData?.likes}</p>
                <p className='text-[9px] text-gray-400'>Likes</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleFollow}
            disabled={loadingFollow}
            className={
              isFollowing
                ? 'text-[10px] px-4 py-1.5 rounded-full font-semibold bg-transparent border border-white/20 text-white'
                : 'text-[10px] px-4 py-1.5 rounded-full font-semibold bg-[#7c3aed] text-white'
            }
          >
            {loadingFollow ? '...' : isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>

        <div className='flex gap-4 mt-6 border-b border-white/10 text-[10px]'>
          <button
            onClick={() => setTab('gallery')}
            className={
              tab === 'gallery'
                ? 'pb-2 border-b border-white text-white'
                : 'pb-2 text-gray-500'
            }
          >
            Gallery
          </button>
          <button
            onClick={() => setTab('liked')}
            className={
              tab === 'liked'
                ? 'pb-2 border-b border-white text-white'
                : 'pb-2 text-gray-500'
            }
          >
            Liked
          </button>
        </div>

        <div className='grid grid-cols-3 gap-1 mt-3 pb-20'>
          {galleryImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt='post'
              className='w-full h-[120px] object-cover'
            />
          ))}
        </div>
      </div>

      <div className='fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#1a1a1a] rounded-full px-6 py-2 flex gap-6 text-[9px] border border-white/10'>
        <Link
          href='/timeline'
          className='flex flex-col items-center text-gray-400'
        >
          Home
        </Link>
        <div className='w-6 h-6 bg-[#7c3aed] rounded-full flex items-center justify-center'>
          +
        </div>
        <Link
          href='/profile'
          className='flex flex-col items-center text-gray-400'
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
