'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

const IMAGES = ['kids.jpg', 'nature.jpg', 'home.jpg', 'party.jpg'];
const CAPTION =
  "Creating unforgettable moments with my favorite person! 📸✨ Let's cherish every second together!";

export default function TimelinePage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar />

      <main className='max-w-[500px] mx-auto pt-6 pb-24'>
        {IMAGES.map((file, i) => {
          const isOpen = expanded === i;
          return (
            <div key={i} className='mb-10 px-3'>
              {/* Post Header - pakai john-doe.jpg */}
              <div className='flex items-center gap-2.5 mb-3'>
                <img
                  src='/images/john-doe.jpg'
                  alt='Johndoe'
                  className='w-9 h-9 rounded-full object-cover'
                />
                <div>
                  <p className='text-[13px] font-bold'>Johndoe</p>
                  <p className='text-[11px] text-white/40'>1 Minutes Ago</p>
                </div>
              </div>

              {/* Gambar Post */}
              <img
                src={`/images/${file}`}
                alt={file}
                className='w-full aspect-square object-cover rounded-xl bg-zinc-900'
              />

              {/* Icon Bar - icon ada di public/ */}
              <div className='flex items-center justify-between mt-3 px-1'>
                <div className='flex items-center gap-5'>
                  <div className='flex items-center gap-1.5'>
                    <img src='/like-icon.png' alt='like' className='w-5 h-5' />
                    <span className='text-[12px]'>20</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <img src='/message.png' alt='comment' className='w-5 h-5' />
                    <span className='text-[12px]'>20</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <img src='/send-2.png' alt='share' className='w-5 h-5' />
                    <span className='text-[12px]'>20</span>
                  </div>
                </div>
                {/* nama file kamu arcnive.png di SS */}
                <img
                  src='/arcnive.png'
                  alt='save'
                  className='w-5 h-5'
                  onError={(e: any) => (e.target.src = '/archive.png')}
                />
              </div>

              {/* Caption sama + Show More dibawah */}
              <div className='mt-3'>
                <p className='text-[13px] font-bold'>Johndoe</p>
                <p className='text-[12px] text-white/60 mt-1 leading-5'>
                  {isOpen ? CAPTION : CAPTION.slice(0, 82) + '...'}
                </p>
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className='text-[#A78BFA] text-[12px] mt-1 font-medium'
                >
                  {isOpen ? 'Show Less' : 'Show More'}
                </button>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
