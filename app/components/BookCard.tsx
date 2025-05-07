'use client';

import { Book } from '@/types';
import React from 'react';

interface BookCardProps {
  book: Book;
}

const statusColors = {
  to_read: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  read: 'bg-green-100 text-green-800'
};

const statusText = {
  to_read: 'To Read',
  in_progress: 'Reading',
  read: 'Read'
};

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-64 bg-gray-200 relative">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{book.author}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {book.genre.name}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded ${statusColors[book.status]}`}>
            {statusText[book.status]}
          </span>
        </div>
      </div>
    </div>
  );
}; 