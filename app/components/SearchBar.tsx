'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/slices/booksSlice';

export const SearchBar: React.FC = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(setSearchQuery(search));
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [search, dispatch]);

  return (
    <div className="relative w-full md:w-80">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="text"
        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setSearch('')}
        >
          <svg
            className="w-4 h-4 text-gray-500 hover:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 12 12M1 13 13 1"
            />
          </svg>
        </button>
      )}
    </div>
  );
}; 