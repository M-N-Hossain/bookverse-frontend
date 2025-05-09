import { Book, BookInput, BookUpdate, Genre } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// State interface for filtering parameters
export interface FilterState {
  searchQuery: string;
  selectedGenreId: number | null;
}

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
    getBooks: builder.query<{
      books: Book[],
      filteredBooks: Book[]
    }, FilterState | void>({
      query: () => '/books',
      providesTags: ['Books'],
      transformResponse: (response: Book[], meta, arg) => {
        // If no filter params are provided, return all books
        if (!arg) {
          return { books: response, filteredBooks: response };
        }
        
        const { searchQuery, selectedGenreId } = arg;
        
        // Apply filtering logic
        let filteredBooks = [...response];
        
        // Apply search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredBooks = filteredBooks.filter(
            book => 
              book.title.toLowerCase().includes(query) ||
              book.author.toLowerCase().includes(query)
          );
        }
        
        // Apply genre filter
        if (selectedGenreId !== null) {
          filteredBooks = filteredBooks.filter(book => book.genre.id === selectedGenreId);
        }
        
        return { books: response, filteredBooks };
      }
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => '/genres',
      providesTags: ['Genres'],
    }),
    getBooksByGenre: builder.query<Book[], number>({
      query: (genreId) => `/books/genre/${genreId}`,
      providesTags: ['Books'],
    }),
    addBook: builder.mutation<Book, BookInput>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Books'],
    }),
    updateBook: builder.mutation<Book, BookUpdate>({
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