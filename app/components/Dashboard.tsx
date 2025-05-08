'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBooksQuery, useGetGenresQuery } from '../redux/api/apiSlice';
import { setBooks } from '../redux/slices/booksSlice';
import { setGenres } from '../redux/slices/genresSlice';
import { RootState } from '../redux/store';
import { BookCounter } from './BookCounter';
import { BookGrid } from './BookGrid';
import { CreateBookForm } from './CreateBookForm';
import { GenreFilter } from './GenreFilter';
import { SearchBar } from './SearchBar';

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredBooks } = useSelector((state: RootState) => state.books);
  const { genres } = useSelector((state: RootState) => state.genres);
  
  const { 
    data: booksData, 
    isLoading: isBooksLoading, 
    error: booksError,
    refetch: refetchBooks
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
      <div className="flex items-center justify-center min-h-screen bg-[#e0f2fe]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0284c7] mx-auto"></div>
          <p className="mt-4 text-[#1e3a8a]">Loading...</p>
        </div>
      </div>
    );
  }

  if (booksError || genresError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#e0f2fe]">
        <div className="text-center text-[#1e3a8a]">
          <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#e0f2fe] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1e3a8a]">BookVerse</h1>
        <CreateBookForm onBookCreated={refetchBooks} />
      </div>

      <BookCounter books={filteredBooks} />
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar />
        <GenreFilter genres={genres} />
      </div>
      
      <BookGrid books={filteredBooks} />
    </div>
  );
}; 