'use client';

import { Genre } from '@/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedGenreId } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

interface GenreFilterProps {
  genres: Genre[];
}

export const GenreFilter: React.FC<GenreFilterProps> = ({ genres }) => {
  const dispatch = useDispatch();
  const { selectedGenreId } = useSelector((state: RootState) => state.filter);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = event.target.value ? Number(event.target.value) : null;
    dispatch(setSelectedGenreId(genreId));
  };

  return (
    <div className="w-full md:w-64">
      <select
        value={selectedGenreId || ''}
        onChange={handleGenreChange}
        className="w-full px-4 py-2 border border-[#0284c7] rounded-lg bg-[#f0f9ff] text-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:border-[#0284c7]"
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