import { create } from 'zustand';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  loggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  loggedIn: false,

  login: (user, token) =>
    set({
      user,
      token,
      loggedIn: true,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      loggedIn: false,
    }),
}));

export default useAuthStore;
