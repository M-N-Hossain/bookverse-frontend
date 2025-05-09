'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useGetBooksQuery, useGetGenresQuery } from '../redux/api/apiSlice';
import { RootState } from '../redux/store';
import { showErrorToast } from '../utils/toast';
import { BookCounter } from './BookCounter';
import { BookGrid } from './BookGrid';
import { BookForm } from './CreateBookForm';
import ErrorBoundary from './ErrorBoundary';
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

  // Show toast for API errors
  React.useEffect(() => {
    if (booksError) {
      showErrorToast(booksError, 'Failed to load books');
    }
    if (genresError) {
      showErrorToast(genresError, 'Failed to load genres');
    }
  }, [booksError, genresError]);

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
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const filteredBooks = booksData?.filteredBooks || [];
  const genres = genresData || [];

  return (
    <div className="container mx-auto px-4 py-8 bg-[#e0f2fe] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-[#1e3a8a]">BookVerse</h1>
        </div>
        <ErrorBoundary
          fallback={
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Something went wrong. Click to reload.
            </button>
          }
        >
          <BookForm onBookSaved={refetchBooks} />
        </ErrorBoundary>
      </div>

      <ErrorBoundary>
        <BookCounter books={filteredBooks} />
      </ErrorBoundary>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <ErrorBoundary>
          <SearchBar />
        </ErrorBoundary>
        <ErrorBoundary>
          <GenreFilter genres={genres} />
        </ErrorBoundary>
      </div>
      
      <ErrorBoundary>
        <BookGrid books={filteredBooks} />
      </ErrorBoundary>
    </div>
  );
}; 