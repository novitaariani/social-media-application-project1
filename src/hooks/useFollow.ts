'use client';
import { useState } from 'react';

const API = 'https://be-social-media-api-production.up.railway.app';

type AuthHeader = Record<string, string>;

const getAuth = (): AuthHeader => {
  if (typeof window === 'undefined') return {};
  const raw =
    localStorage.getItem('token') || localStorage.getItem('access_token') || '';
  if (!raw) return {};
  const token = raw.replace(/"/g, '').trim();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export function useFollow() {
  const [loading, setLoading] = useState(false);

  const toggleFollow = async (username: string, isFollowed: boolean) => {
    const auth = getAuth();

    if (!auth.Authorization) {
      window.location.href = '/login';
      return { success: false, isFollowed };
    }

    setLoading(true);
    try {
      const method = isFollowed ? 'DELETE' : 'POST';

      // FIX TYPE ERROR DI SINI KAWAN - PASTIIN HEADERS SELALU STRING
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...auth, // Sekarang auth pasti { Authorization: string } kalau ada
      };

      const res = await fetch(`${API}/api/follow/${username}`, {
        method,
        headers, // UDAH BENER TYPE NYA!
      });

      const data = (await res.json()) as { message?: string };

      if (!res.ok) {
        throw new Error(data.message || 'Failed to follow');
      }

      return { success: true, isFollowed: !isFollowed };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed';
      console.error(message);
      return { success: false, isFollowed, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { toggleFollow, loading };
}
