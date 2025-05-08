'use client';

import { Book } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { Fragment, useState } from 'react';
import { useDeleteBookMutation, useGetBooksQuery, useGetGenresQuery } from '../redux/api/apiSlice';
import { BookForm } from './CreateBookForm';

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { refetch } = useGetBooksQuery();
  const { data: genresData } = useGetGenresQuery();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  
  // Find the genre name for display
  const genre = genresData?.find(g => g.id === book.genre.id);
  
  // Handle successful book update
  const handleBookUpdated = () => {
    refetch();
  };

  // Handle book deletion
  const handleDeleteBook = async () => {
    try {
      await deleteBook(book.id.toString()).unwrap();
      refetch();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book');
    }
  };

  return (
    <div className="card transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br from-blue-200 to-indigo-300 relative group">
      {/* Edit button - using BookForm with isEdit=true */}
      <div className="absolute top-2 right-12 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <BookForm 
          isEdit={true} 
          book={book} 
          onBookSaved={handleBookUpdated}
          trigger={
            <button 
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 cursor-pointer"
              aria-label="Edit book"
            >
              <PencilIcon className="h-5 w-5 text-blue-600" />
            </button>
          }
        />
      </div>

      {/* Delete button */}
      <button 
        onClick={() => setShowDeleteConfirm(true)}
        className="absolute top-2 right-2 p-2 bg-red-500 rounded-full shadow-md hover:bg-red-400 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        aria-label="Delete book"
      >
        <TrashIcon className="h-5 w-5 text-white" />
      </button>

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
            {genre?.name || 'Unknown Genre'}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded ${statusColors[book.status]}`}>
            {statusText[book.status]}
          </span>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Transition appear show={showDeleteConfirm} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowDeleteConfirm(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                  >
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2" aria-hidden="true" />
                    Delete Book
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete "{book.title}"? This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isDeleting}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={handleDeleteBook}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}; 