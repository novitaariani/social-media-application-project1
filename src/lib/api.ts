const API = process.env.NEXT_PUBLIC_API_URL; // https://be-social-media-api-production.up.railway.app/api

// Helper biar gak 401
function headers() {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const UsersAPI = {
  // GET /api/users/{username}
  getProfile: async (username: string) => {
    const res = await fetch(`${API}/users/${username}`, { headers: headers() });
    return res.json();
  },
  // GET /api/users/{username}/posts
  getPosts: async (username: string) => {
    const res = await fetch(`${API}/users/${username}/posts`, {
      headers: headers(),
    });
    return res.json();
  },
  // GET /api/users/{username}/likes
  getLikes: async (username: string) => {
    const res = await fetch(`${API}/users/${username}/likes`, {
      headers: headers(),
    });
    return res.json();
  },
  // GET /api/users/search?q=
  search: async (q: string) => {
    const res = await fetch(`${API}/users/search?query=${q}&q=${q}&name=${q}`, {
      headers: headers(),
    });
    return res.json();
  },
};
