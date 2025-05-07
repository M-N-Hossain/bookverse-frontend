'use client';

import { Genre } from '@/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredBooks } from '../redux/slices/booksSlice';
import { setSelectedGenre } from '../redux/slices/genresSlice';
import { RootState } from '../redux/store';

interface GenreFilterProps {
  genres: Genre[];
}

export const GenreFilter: React.FC<GenreFilterProps> = ({ genres }) => {
  const dispatch = useDispatch();
  const { selectedGenre } = useSelector((state: RootState) => state.genres);
  const { books } = useSelector((state: RootState) => state.books);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = event.target.value || null;
    dispatch(setSelectedGenre(genreId));
    
    // Filter books based on selected genre
    if (genreId) {
      const filtered = books.filter(book => book.genre.id === genreId);
      console.log(books.genre)
      dispatch(setFilteredBooks(filtered));
    } else {
      // If no genre selected, show all books
      dispatch(setFilteredBooks(books));
    }
  };

  return (
    <div className="w-full md:w-64">
      <select
        value={selectedGenre || ''}
        onChange={handleGenreChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}; 