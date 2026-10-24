'use client';
import { useState } from 'react';
import Image from 'next/image';

type LikedUser = {
  id: string;
  name: string;
  avatar: string;
};

type Props = {
  postId: string;
  onClose: () => void;
};

export default function LikesModal({ postId, onClose }: Props) {
  const [users] = useState<LikedUser[]>([
    { id: '1', name: 'Alexander', avatar: '/images/alexander.png' },
    { id: '2', name: 'John Doe', avatar: '/images/john-doe.jpg' },
  ]);

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center p-6'>
      <div
        className='absolute inset-0 bg-black/80 backdrop-blur-sm'
        onClick={onClose}
      />
      <div className='relative w-full max-w-[380px] bg-[#101010] border border-white/10 rounded-[16px] overflow-hidden'>
        <div className='flex items-center justify-between p-4 border-b border-white/10'>
          <p className='text-[13px] font-bold text-white'>Likes</p>
          <button
            onClick={onClose}
            className='text-white/60 hover:text-white text-[16px]'
          >
            ✕
          </button>
        </div>
        <div className='max-h-[400px] overflow-y-auto p-4 space-y-3'>
          {users.map((user) => (
            <div key={user.id} className='flex items-center gap-3'>
              <Image
                src={user.avatar}
                width={32}
                height={32}
                className='rounded-full object-cover'
                alt={user.name}
                unoptimized
              />
              <p className='text-[12px] font-semibold text-white'>
                {user.name}
              </p>
              <button className='ml-auto text-[11px] bg-white text-black px-4 py-1.5 rounded-full font-bold'>
                Follow
              </button>
            </div>
          ))}
        </div>
        <div className='p-3 text-center'>
          <p className='text-[10px] text-white/30'>Post ID: {postId}</p>
        </div>
      </div>
    </div>
  );
}
