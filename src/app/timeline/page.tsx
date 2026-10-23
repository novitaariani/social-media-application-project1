'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import LikesModal from '@/components/LikesModal';

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://be-social-media-api-production.up.railway.app';

type Post = {
  _id: string;
  image: string;
  caption: string;
  likes: number;
  isLiked?: boolean;
  user?: any;
};

export default function TimelinePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeLikesPost, setActiveLikesPost] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/api/posts?page=1&limit=20`)
      .then((r) => r.json())
      .then((json) => {
        const data = json.data || json.posts || json || [];
        setPosts(
          data.length
            ? data.map((p: any) => ({
                ...p,
                _id: p._id || p.id,
                likes: p.likesCount ?? p.likes ?? 20,
                isLiked: p.isLiked ?? p.is_liked ?? false,
              }))
            : ([
                {
                  _id: '1',
                  image: 'kids.jpg',
                  caption: 'Creating unforgettable moments...',
                  likes: 20,
                  isLiked: false,
                  user: { username: 'Johndoe' },
                },
              ] as any)
        );
      })
      .catch(() => {
        setPosts([
          {
            _id: '1',
            image: 'kids.jpg',
            caption: 'Creating unforgettable moments...',
            likes: 20,
            isLiked: false,
            user: { username: 'Johndoe' },
          },
        ] as any);
      });
  }, []);

  // LIKE ACTION - sesuai Swagger POST /api/posts/{id}/like
  const handleLike = async (postId: string) => {
    const target = posts.find((p) => p._id === postId);
    if (!target) return;

    // Optimistic UI - langsung berubah tanpa nunggu BE
    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? {
              ...p,
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );

    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${API}/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        // Kalau 401/403, rollback karena belum login
        console.log('like api failed', res.status);
        // rollback
        setPosts((prev) =>
          prev.map((p) =>
            p._id === postId
              ? { ...p, isLiked: target.isLiked, likes: target.likes }
              : p
          )
        );
      }
    } catch (e) {
      console.log('like error', e);
    }
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar />
      <main className='max-w-[500px] mx-auto pt-6 pb-24'>
        {posts.map((post) => (
          <div key={post._id} className='mb-10 px-3'>
            <div className='flex items-center gap-2.5 mb-3'>
              <img
                src='/images/john-doe.jpg'
                className='w-9 h-9 rounded-full object-cover'
                alt=''
              />
              <div>
                <p className='text-[13px] font-bold'>
                  {post.user?.username || 'Johndoe'}
                </p>
                <p className='text-[11px] text-white/40'>1 Minutes Ago</p>
              </div>
            </div>

            <img
              src={`/images/${post.image}`}
              className='w-full aspect-square object-cover rounded-xl bg-zinc-900'
              alt=''
            />

            <div className='flex items-center justify-between mt-3 px-1'>
              <div className='flex items-center gap-5'>
                {/* LIKE ACTION - KLIK ICON HATI */}
                <div className='flex items-center gap-1.5'>
                  <button
                    onClick={() => handleLike(post._id)}
                    className='active:scale-90 transition-transform'
                  >
                    <img
                      src='/like-icon.png'
                      className={`w-5 h-5 object-contain transition-all ${post.isLiked ? 'opacity-100' : 'grayscale opacity-60 hover:opacity-100'}`}
                      alt='like'
                    />
                  </button>
                  {/* KLIK ANGKA BUKA MODAL */}
                  <button onClick={() => setActiveLikesPost(post._id)}>
                    <span
                      className={`text-[12px] ${post.isLiked ? 'text-[#FF4D6D] font-bold' : ''}`}
                    >
                      {post.likes}
                    </span>
                  </button>
                </div>

                <div className='flex items-center gap-1.5'>
                  <img src='/message.png' className='w-5 h-5' alt='' />
                  <span className='text-[12px]'>20</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <img src='/send-2.png' className='w-5 h-5' alt='' />
                  <span className='text-[12px]'>20</span>
                </div>
              </div>
              <img
                src='/archive.png'
                className='w-5 h-5 object-contain'
                alt=''
              />
            </div>
          </div>
        ))}

        {activeLikesPost && (
          <LikesModal
            postId={activeLikesPost}
            onClose={() => setActiveLikesPost(null)}
          />
        )}
      </main>
    </div>
  );
}
