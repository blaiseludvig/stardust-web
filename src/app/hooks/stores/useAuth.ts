import { KyResponse } from 'ky';
import { clearJwt, getJwt, setJwt } from 'src/app/util/lib/apiJwt';
import { getCustomKy } from 'src/app/util/lib/getCustomKy';
import { create } from 'zustand';

type State = {
  isAuthenticated: boolean;
};

type Actions = {
  setAuthenticated: (newAuthState: boolean) => void;
  signUp: (email: string, password: string) => Promise<KyResponse>;
  signIn: (email: string, password: string) => Promise<KyResponse>;
  signOut: () => void;
};

export const useAuth = create<State & Actions>()((set, get) => ({
  isAuthenticated: getJwt() ? true : false,

  setAuthenticated: (newAuthState) =>
    set(() => ({
      isAuthenticated: newAuthState,
    })),

  signUp: async (email, password) => {
    const myKy = getCustomKy();

    const response = await myKy.post('auth/signup', {
      json: { email, password },
    });

    return response;
  },

  signIn: async (email, password) => {
    const myky = getCustomKy();

    const response = await myky.post('auth/login', {
      json: { email, password },
    });

    if (!response.ok) {
      // TODO: implement error handling
      alert('login fail');
      return response;
    }

    const json: { access_token: string } = await response.json();

    setJwt(json.access_token);
    get().setAuthenticated(true);

    return response;
  },

  signOut: () => {
    clearJwt();
    get().setAuthenticated(false);
  },
}));
