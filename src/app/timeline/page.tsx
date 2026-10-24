'use client';
import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import CommentsModal from '@/components/CommentsModal';

function Caption({ text }: { text: string }) {
  const [expand, setExpand] = useState(false);
  const isLong = text.length > 120;
  const displayText = expand ? text : text.slice(0, 120);

  return (
    <p className='text-[12px] text-white/70 px-1 leading-[18px]'>
      {displayText}
      {!expand && isLong && '... '}
      {isLong && (
        <button
          onClick={() => setExpand(!expand)}
          className='text-white font-semibold hover:text-white/80'
        >
          {expand ? ' Show Less' : 'Show More'}
        </button>
      )}
    </p>
  );
}

export default function TimelinePage() {
  const [openComment, setOpenComment] = useState(false);
  const [activeImg, setActiveImg] = useState('/images/kids.jpg');

  const posts = [
    '/images/home.jpg',
    '/images/kids.jpg',
    '/images/nature.jpg',
    '/images/party.jpg',
  ];

  const caption =
    'Creating unforgettable moments with my favorite person! ✨ Every laugh, every adventure, every quiet moment together feels like magic. #Love #CoupleGoals #Memories';

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar />
      <div className='max-w-[600px] mx-auto mt-6 px-4 pb-20 space-y-10'>
        {posts.map((img, i) => (
          <div key={i} className='border-b border-white/10 pb-6'>
            <div className='flex gap-2.5 mb-3'>
              <Image
                src='/images/john-doe.jpg'
                width={32}
                height={32}
                className='rounded-full object-cover'
                alt='John Doe'
                unoptimized
              />
              <div>
                <p className='text-[13px] font-semibold'>John Doe</p>
                <p className='text-[10px] text-white/40'>1 Minutes Ago</p>
              </div>
            </div>
            <Image
              src={img}
              alt='post'
              width={600}
              height={500}
              className='w-full rounded-[12px] object-cover max-h-[500px]'
              unoptimized
            />
            <div className='flex items-center gap-5 px-1 py-3'>
              <button className='flex items-center gap-1.5'>
                <Image
                  src='/like-icon.png'
                  width={20}
                  height={20}
                  alt='like'
                  unoptimized
                />
                <span className='text-[13px] text-white/80'>20</span>
              </button>
              <button
                onClick={() => {
                  setActiveImg(img);
                  setOpenComment(true);
                }}
                className='flex items-center gap-1.5'
              >
                <Image
                  src='/message.png'
                  width={20}
                  height={20}
                  alt='message'
                  unoptimized
                />
                <span className='text-[13px] text-white/80'>20</span>
              </button>
              <button className='flex items-center gap-1.5'>
                <Image
                  src='/send-2.png'
                  width={20}
                  height={20}
                  alt='send'
                  unoptimized
                />
                <span className='text-[13px] text-white/80'>20</span>
              </button>
              <button className='ml-auto'>
                <Image
                  src='/archive.png'
                  width={20}
                  height={20}
                  alt='archive'
                  unoptimized
                />
              </button>
            </div>
            <Caption text={caption} />
          </div>
        ))}
      </div>
      {openComment && (
        <CommentsModal
          postId='1'
          image={activeImg}
          onClose={() => setOpenComment(false)}
        />
      )}
    </div>
  );
}
