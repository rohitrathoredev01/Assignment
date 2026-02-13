import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../config/axiosBaseQuery';
import { API_PATH, API_URL } from '../config/config';

export const productService = createApi({
  reducerPath: 'ProductService',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL.url }),
  refetchOnFocus: true,
  endpoints: builder => ({
    getProduct: builder.query({
      query: data => ({
        url: API_PATH().apis.productList,
        method: 'GET',
      }),
    }),
    getProductDetails: builder.query({
      query: id => ({
        url: `${API_PATH().apis.productDetails}/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProductQuery, useGetProductDetailsQuery } = productService;
