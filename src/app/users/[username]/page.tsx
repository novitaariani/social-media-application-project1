'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import FollowButton from '@/components/FollowButton';

// Mock data biar gak corrupt
const mockUsers: any = {
  alexander: {
    name: 'Alexander',
    bio: 'UI Designer • Traveling',
    followers: 120,
    following: 80,
    isFollowed: false,
  },
  novita: {
    name: 'Novita Ariani',
    bio: 'Bootcamp Student',
    followers: 200,
    following: 150,
    isFollowed: true,
  },
};

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const user = mockUsers[username] || {
    name: username,
    bio: 'User Sociality',
    followers: 0,
    following: 0,
    isFollowed: false,
  };

  const [followersCount, setFollowersCount] = useState(user.followers);

  const handleFollowToggle = (isFollowed: boolean) => {
    setFollowersCount((prev: number) => (isFollowed ? prev + 1 : prev - 1));
  };

  return (
    <div className='max-w-[600px] mx-auto p-6 bg-white dark:bg-black min-h-screen'>
      {/* Header */}
      <div className='flex gap-6 items-start'>
        <img
          src={`https://i.pravatar.cc/150?u=${username}`}
          alt={username}
          className='w-24 h-24 rounded-full'
        />
        <div className='flex-1'>
          <div className='flex gap-4 items-center'>
            <h1 className='text-xl font-bold'>{user.name}</h1>
            <FollowButton
              username={username}
              initialIsFollowed={user.isFollowed}
              onToggle={handleFollowToggle}
            />
          </div>
          <p className='text-sm text-gray-500 mt-1'>@{username}</p>
          <p className='text-sm mt-2'>{user.bio}</p>

          <div className='flex gap-4 mt-3 text-sm'>
            <span>
              <b>{followersCount}</b> Followers
            </span>
            <span>
              <b>{user.following}</b> Following
            </span>
          </div>
        </div>
      </div>

      {/* Gallery - No Corrupt */}
      <div className='mt-8'>
        <h2 className='font-bold mb-4'>Posts</h2>
        <div className='grid grid-cols-3 gap-1'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <img
              key={i}
              src={`https://picsum.photos/300/300?random=${i + username.length}`}
              alt='post'
              className='w-full aspect-square object-cover rounded'
            />
          ))}
        </div>
      </div>
    </div>
  );
}
