/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignJWT } from 'jose/dist/types/jwt/sign';
import { jwtVerify } from 'jose/dist/types/jwt/verify';

import { getItem } from '@/lib/localStorage';
import { AxiosRequestConfig } from 'axios';
import { JWTPayload } from 'jose/dist/types/types';

const JWT_SECRET_KEY = 'test-secret-key';
const jwtSecret = new TextEncoder().encode(JWT_SECRET_KEY);

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getStorageValue = (entity: string) =>
  getItem(import.meta.env.VITE_BASE_URL)?.[entity];

// Wrapper for axios mock adapter that adds authentication checks
export const withAuth =
  (...data: any) =>
  async (config: AxiosRequestConfig) => {
    const token = config?.headers?.Authorization?.split(' ')[1];

    // Verifies access token if present
    const verified = token ? await verifyToken(token) : false;

    // Returns 403 if token is invalid and auth is enabled
    if (import.meta.env.VITE_USE_AUTH && !verified) {
      return [403, { message: 'Unauthorized' }];
    }

    // Calls the original mock function
    return typeof data[0] === 'function' ? data[0](config) : data;
  };

// Verifies a JWT token
export const verifyToken = async (
  token: any,
  options?: { returnPayload: boolean },
): Promise<boolean | JWTPayload> => {
  try {
    const verification = await jwtVerify(token, jwtSecret);
    return options?.returnPayload ? verification.payload : true;
  } catch {
    return false;
  }
};

// Generates a refresh token with a 30 day expiration
export const generateRefreshToken = async (data: any) => {
  return await new SignJWT({ data })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(jwtSecret);
};

// Generates an access token with a 15 minute expiration
export const generateAccessToken = async (data: any) => {
  return await new SignJWT({ data })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m')
    .sign(jwtSecret);
};
