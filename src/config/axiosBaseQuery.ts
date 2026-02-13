// import axios from 'axios';
// import { store } from '../store';
// import { logoutSuccess } from '../features/authSlice';

// export const axiosBaseQuery = ({ baseUrl }: any) =>
//   async ({ url, method, data, headers }: any) => {
//     try {
//       const result = await axios({ url: baseUrl + url, method, data, headers });
//       return { data: result.data };
//     } catch (axiosError) {
//       let err: any = axiosError;
//       if (err?.message === 'Request failed with status code 401') {
//         store.dispatch(logoutSuccess())
//       }
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       };
//     }
//   };

import axios from 'axios';
import { logoutSuccess } from '../features/authSlice';
import { store } from '../store';

export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string }) => async ({ url, method, data, headers }: any) => {
  try {
    const state: any = store.getState();
    const token = state?.auth?.token;

    const authHeaders = {
      'Content-Type': 'application/json',
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      headers: authHeaders,
    });

    return { data: result.data };

  } catch (axiosError: any) {
    if (axiosError?.response?.status === 401) {
      store.dispatch(logoutSuccess());
    }

    return {
      error: {
        status: axiosError.response?.status,
        data: axiosError.response?.data || axiosError.message,
      },
    };
  }
};