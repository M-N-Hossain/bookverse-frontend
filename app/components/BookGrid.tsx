'use client';

import { Book } from '@/types';
import React from 'react';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
}

export const BookGrid: React.FC<BookGridProps> = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.length > 0 ? (
        books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <h3 className="text-xl font-medium text-gray-500">No books found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}; 