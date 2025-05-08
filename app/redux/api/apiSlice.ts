import { Book, Genre } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Books', 'Genres'],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/books',
      providesTags: ['Books'],
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => '/genres',
      providesTags: ['Genres'],
    }),
    getBooksByGenre: builder.query<Book[], string>({
      query: (genreId) => `/books/genre/${genreId}`,
      providesTags: ['Books'],
    }),
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Books'],
    }),
    updateBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: `/books/${book.id}`,
        method: 'PUT',
        body: book,
      }),
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetGenresQuery,
  useGetBooksByGenreQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = apiSlice; 