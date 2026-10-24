'use client';
import { useState } from 'react';
import { useFollow } from '@/hooks/useFollow';

export default function FollowButton({
  username,
  initialFollowed = false,
}: {
  username: string;
  initialFollowed?: boolean;
}) {
  const [isFollowed, setIsFollowed] = useState(initialFollowed);
  const { follow, unfollow, loading } = useFollow();

  const handleClick = async () => {
    try {
      if (isFollowed) {
        await unfollow(username);
        setIsFollowed(false);
      } else {
        await follow(username);
        setIsFollowed(true);
      }
    } catch (e) {
      alert('Gagal, cek token login kawan!');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`rounded-full px-5 py-1.5 text-[11px] font-semibold border transition
        ${isFollowed ? 'bg-white text-black border-white hover:bg-white/80' : 'bg-[#6D28D9] text-white border-[#6D28D9] hover:bg-[#7C3AED]'}`}
    >
      {loading ? '...' : isFollowed ? 'Following' : 'Follow'}
    </button>
  );
}
