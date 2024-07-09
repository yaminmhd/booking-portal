import axios, { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';

import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  withAuth,
} from './helpers';
import { getListingById, getListings } from './listings';
import { getLocationById } from './locations';
import { getUser } from './users';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const adapter = new MockAdapter(api, { delayResponse: 1000 });

adapter.onGet(/\/api\/listings\/\d+/).reply(
  withAuth(async (config: AxiosRequestConfig) => {
    const matcher = config?.url?.match(/\/api\/listings\/(\d+)/);
    if (!matcher) {
      return [404, { message: 'Invalid route' }];
    }
    const id = parseInt(matcher[1]);

    // Gets listing by id
    const listing = getListingById(id);
    if (!listing) {
      return [404, { message: 'Listing not found' }];
    }

    const location = getLocationById(listing.locationId);
    if (!location) {
      return [404, { message: 'Location not found' }];
    }

    return [200, { ...listing, location }];
  }),
);

adapter.onGet('/api/listings').reply(
  withAuth(async (config: AxiosRequestConfig) => {
    const { params } = config;

    const listings = getListings(params);
    if (!listings) {
      return [404, { message: 'No listings found' }];
    }

    const listingsLocationResult = listings.map((listing) => {
      const location = getLocationById(listing.locationId);
      return { ...listing, location };
    });

    return [200, listingsLocationResult];
  }),
);

// Gets the current user
adapter.onGet('/api/me').reply(
  withAuth(async (config: AxiosRequestConfig) => {
    const accessToken: string = config?.headers?.Authorization?.split(' ')[1];

    // Verifies access token and returns payload
    const accessTokenPayload = await verifyToken(accessToken, {
      returnPayload: true,
    });

    if (!accessTokenPayload) {
      return [403, { message: 'Unauthorized' }];
    }

    // Verifies refresh token and returns payload
    const refreshTokenPayload = await verifyToken(accessTokenPayload, {
      returnPayload: true,
    });

    if (!refreshTokenPayload) {
      return [403, { message: 'Unauthorized' }];
    }

    // Returns access token and user
    return [
      200,
      {
        accessToken: import.meta.env.VITE_USE_AUTH ? accessToken : null,
      },
    ];
  }),
);

// Signs the user in
adapter.onPost('/api/signin').reply(async (config) => {
  const { data } = config;
  const user = getUser(JSON.parse(data));

  if (user) {
    // Creates a refresh token based on the user's id
    const refreshToken = await generateRefreshToken(user.id);

    // Since there is no backend, token is stored in a normal cookie
    // Otherwise it would be stored in a secure HTTP-only cookie for security
    Cookies.set('refreshToken', refreshToken);

    // Creates an access token based on the refresh token
    const accessToken = await generateAccessToken(refreshToken);

    // Returns access token and user
    return [
      200,
      {
        accessToken: import.meta.env.VITE_USE_AUTH ? accessToken : null,
      },
    ];
  } else {
    return [401, { message: 'Invalid credentials' }];
  }
});

// Refreshes the user's access token
adapter.onGet('/api/refreshToken').reply(async () => {
  // Gets refresh token from cookie
  const refreshToken = Cookies.get('refreshToken');

  // Verifies refresh token and returns payload
  const refreshTokenPayload = refreshToken
    ? await verifyToken(refreshToken, { returnPayload: true })
    : false;

  if (import.meta.env.VITE_USE_AUTH && !refreshTokenPayload) {
    return [403, { message: 'Invalid refresh token' }];
  }

  // Generates a new access token based on refresh token
  const accessToken = await generateAccessToken(refreshToken);

  return [200, import.meta.env.VITE_USE_AUTH ? { accessToken } : null];
});

// Signs the user out
adapter.onPost('/api/signout').reply(
  withAuth(() => {
    // Removes refresh token from cookies
    Cookies.remove('refreshToken');

    return [200];
  }),
);

export default api;
