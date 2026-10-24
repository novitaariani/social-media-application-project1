'use client';
import { useState } from 'react';

export default function FollowButton(props: any) {
  const { username, initialIsFollowed = false, onToggle } = props;
  const [isFollowed, setIsFollowed] = useState(initialIsFollowed);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const newState = !isFollowed;
    setIsFollowed(newState);
    if (onToggle) onToggle(newState);
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-5 py-1.5 rounded-full text-sm font-semibold ${isFollowed ? 'bg-gray-200 text-black' : 'bg-black text-white'}`}
    >
      {loading ? '...' : isFollowed ? 'Following' : 'Follow'}
    </button>
  );
}
