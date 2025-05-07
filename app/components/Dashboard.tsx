'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBooksQuery, useGetGenresQuery } from '../redux/api/apiSlice';
import { setBooks } from '../redux/slices/booksSlice';
import { setGenres } from '../redux/slices/genresSlice';
import { RootState } from '../redux/store';
import { BookGrid } from './BookGrid';
import { GenreFilter } from './GenreFilter';
import { SearchBar } from './SearchBar';

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredBooks } = useSelector((state: RootState) => state.books);
  const { genres } = useSelector((state: RootState) => state.genres);
  
  const { 
    data: booksData, 
    isLoading: isBooksLoading, 
    error: booksError 
  } = useGetBooksQuery();
  
  const {
    data: genresData,
    isLoading: isGenresLoading,
    error: genresError
  } = useGetGenresQuery();

  useEffect(() => {
    if (booksData) {
      dispatch(setBooks(booksData));
    }
  }, [booksData, dispatch]);

  useEffect(() => {
    if (genresData) {
      dispatch(setGenres(genresData));
    }
  }, [genresData, dispatch]);

  if (isBooksLoading || isGenresLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (booksError || genresError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">BookVerse</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar />
        <GenreFilter genres={genres} />
      </div>
      
      <BookGrid books={filteredBooks} />
    </div>
  );
}; 