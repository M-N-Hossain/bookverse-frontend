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
    <div className="card hover:shadow-lg transition-shadow">
      <div className="h-64 bg-[#f0f9ff] relative">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate text-[#1e3a8a]">{book.title}</h3>
        <p className="text-[#0284c7] text-sm mb-2">{book.author}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-medium text-[#1e3a8a] bg-[#e0f2fe] px-2 py-1 rounded">
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