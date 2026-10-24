'use client';
import { useState } from 'react';

type Props = {
  username: string;
  initialIsFollowed?: boolean;
  onToggle?: (isFollowed: boolean) => void;
};

export default function FollowButton({
  username,
  initialIsFollowed = false,
  onToggle,
}: Props) {
  const [isFollowed, setIsFollowed] = useState(initialIsFollowed);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    // simulate toggle - ganti dengan API call kamu kalau ada
    const newState = !isFollowed;
    setIsFollowed(newState);
    if (onToggle) onToggle(newState);
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-4 py-1.5 rounded-full font-medium ${isFollowed ? 'bg-gray-200 text-black' : 'bg-black text-white'}`}
    >
      {loading ? '...' : isFollowed ? 'Following' : 'Follow'}
    </button>
  );
}
