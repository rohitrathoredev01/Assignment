import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../config/axiosBaseQuery';
import {API_PATH, API_URL} from '../config/config';

export const authService = createApi({
  reducerPath: 'logInService',
  baseQuery: axiosBaseQuery({baseUrl: API_URL.url}),
  endpoints: builder => ({
 
  }),
});

export const {} =
  authService;
