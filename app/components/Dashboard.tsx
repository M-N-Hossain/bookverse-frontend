'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useGetBooksQuery, useGetGenresQuery } from '../redux/api/apiSlice';
import { RootState } from '../redux/store';
import { BookCounter } from './BookCounter';
import { BookGrid } from './BookGrid';
import { BookForm } from './CreateBookForm';
import { GenreFilter } from './GenreFilter';
import { SearchBar } from './SearchBar';

export const Dashboard: React.FC = () => {
  const filterState = useSelector((state: RootState) => state.filter);
  
  const { 
    data: booksData, 
    isLoading: isBooksLoading, 
    error: booksError,
    refetch: refetchBooks
  } = useGetBooksQuery(filterState);
  
  const {
    data: genresData,
    isLoading: isGenresLoading,
    error: genresError
  } = useGetGenresQuery();

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

  const filteredBooks = booksData?.filteredBooks || [];
  const genres = genresData || [];

  return (
    <div className="container mx-auto px-4 py-8 bg-[#e0f2fe] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1e3a8a]">BookVerse</h1>
        <BookForm onBookSaved={refetchBooks} />
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