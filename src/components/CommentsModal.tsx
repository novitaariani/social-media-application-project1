'use client';
import { useState } from 'react';
import Image from 'next/image';

type CommentItem = {
  id?: string;
  name: string;
  time: string;
  text: string;
  avatar: string;
};

type Props = {
  postId: string;
  image: string;
  onClose: () => void;
};

export default function CommentsModal({ postId, image, onClose }: Props) {
  const [comments, setComments] = useState<CommentItem[]>([
    {
      name: 'Alexander',
      time: '1 Minute Ago',
      text: 'This is the kind of love everyone dreams about ✨',
      avatar: '/images/alexander.png',
    },
    {
      name: 'Alexander',
      time: '1 Minute Ago',
      text: 'This is the kind of love everyone dreams about ✨',
      avatar: '/images/alexander.png',
    },
  ]);
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const EMOJIS = ['😊', '😂', '❤️', '🔥', '😍', '🥰', '😎', '✨', '🙏', '💯'];

  const handlePost = async () => {
    if (!text.trim()) return;
    const newComment: CommentItem = {
      name: 'John Doe',
      time: 'Just now',
      text,
      avatar: '/images/john-doe.jpg',
    };
    setComments([...comments, newComment]);
    setText('');
    setShowEmoji(false);
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      await fetch(
        `https://be-social-media-api-production.up.railway.app/api/posts/${postId}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ content: text }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='fixed inset-0 z-[100] bg-[#050505] flex flex-col'>
      <div className='h-[56px] bg-black border-b border-white/10 flex items-center justify-between px-6 shrink-0'>
        <div className='flex items-center gap-2'>
          <Image
            src='/logo.png'
            width={22}
            height={22}
            alt='logo'
            unoptimized
          />
          <span className='font-bold text-[14px] text-white'>Sociality</span>
        </div>
        <div className='bg-[#1E1E1E] rounded-full px-4 py-1.5 w-[340px] hidden md:block'>
          <input
            placeholder='Search'
            className='bg-transparent text-[12px] w-full outline-none text-white placeholder:text-white/30'
          />
        </div>
        <div className='flex items-center gap-2'>
          <Image
            src='/images/john-doe.jpg'
            width={24}
            height={24}
            className='rounded-full object-cover'
            alt='John Doe'
            unoptimized
          />
          <span className='text-[12px] text-white'>John Doe</span>
        </div>
      </div>

      <button
        onClick={onClose}
        className='absolute top-[68px] right-6 text-white/70 hover:text-white text-[22px] z-50'
      >
        ✕
      </button>

      <div className='flex-1 flex flex-col md:flex-row overflow-hidden'>
        <div className='flex-1 bg-black flex items-center justify-center relative'>
          <Image
            src={image}
            alt='post'
            width={1200}
            height={1200}
            className='w-full h-full object-contain'
            unoptimized
          />
        </div>

        <div className='w-full md:w-[380px] bg-[#0D0D0D] border-l border-white/10 flex flex-col'>
          <div className='p-4 flex gap-3'>
            <Image
              src='/images/john-doe.jpg'
              width={36}
              height={36}
              className='rounded-full object-cover'
              alt='John Doe'
              unoptimized
            />
            <div className='flex-1'>
              <div className='flex justify-between'>
                <div>
                  <p className='text-[13px] font-semibold text-white'>
                    John Doe
                  </p>
                  <p className='text-[10px] text-white/40'>1 Minutes Ago</p>
                </div>
                <span className='text-white/40'>•••</span>
              </div>
              <p className='text-[11.5px] text-white/60 leading-[18px] mt-3'>
                Creating unforgettable moments with my favorite person! Every
                laugh, every adventure, every quiet moment together feels like
                magic. You make ordinary days feel extraordinary, and I am so
                grateful to share this journey with you. Let us keep cherishing
                every second, because with you, time always feels too short.
              </p>
            </div>
          </div>

          <div className='mx-4 h-[1px] bg-white/10' />

          <div className='flex-1 overflow-y-auto p-4 space-y-5'>
            <p className='text-[12px] font-bold text-white'>Comments</p>
            {comments.map((c, idx) => (
              <div key={idx} className='flex gap-2.5'>
                <Image
                  src={c.avatar}
                  width={28}
                  height={28}
                  className='rounded-full object-cover'
                  alt={c.name}
                  unoptimized
                />
                <div>
                  <p className='text-[12px] font-semibold text-white'>
                    {c.name}
                  </p>
                  <p className='text-[10px] text-white/30'>{c.time}</p>
                  <p className='text-[11.5px] text-white/60 mt-1'>{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='border-t border-white/10 p-4 space-y-3'>
            <div className='flex items-center gap-4 text-[12px] text-white/70'>
              <span className='flex items-center gap-1.5'>
                <Image
                  src='/like-icon.png'
                  width={16}
                  height={16}
                  alt='like'
                  unoptimized
                />{' '}
                20
              </span>
              <span className='flex items-center gap-1.5'>
                <Image
                  src='/message.png'
                  width={16}
                  height={16}
                  alt='comment'
                  unoptimized
                />{' '}
                20
              </span>
              <span className='flex items-center gap-1.5'>
                <Image
                  src='/send-2.png'
                  width={16}
                  height={16}
                  alt='send'
                  unoptimized
                />{' '}
                20
              </span>
              <Image
                src='/archive.png'
                width={16}
                height={16}
                className='ml-auto'
                alt='bookmark'
                unoptimized
              />
            </div>
            {showEmoji && (
              <div className='grid grid-cols-6 gap-2 pb-2'>
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    onClick={() => setText((p) => p + e)}
                    className='text-[16px] hover:bg-white/10 rounded p-1'
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}
            <div className='flex items-center gap-2 bg-[#1E1E1E] rounded-full px-2 py-1.5 border border-white/10'>
              <button
                onClick={() => setShowEmoji(!showEmoji)}
                className='w-7 h-7 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[12px]'
              >
                ☺
              </button>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePost();
                }}
                placeholder='Add Comment'
                className='flex-1 bg-transparent text-[12px] outline-none placeholder:text-white/30 text-white'
              />
              <button
                onClick={handlePost}
                className={`text-[12px] font-bold pr-2 ${text.trim() ? 'text-white' : 'text-white/20'}`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
