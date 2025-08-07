import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'tumaini_auth_token';

export interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  name: string;
  exp: number;
}

export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenValid = (): boolean => {
  const token = getAuthToken();
  
  if (!token) {
    return false;
  }
  
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const getDecodedToken = (): DecodedToken | null => {
  const token = getAuthToken();
  
  if (!token) {
    return null;
  }
  
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    return null;
  }
};