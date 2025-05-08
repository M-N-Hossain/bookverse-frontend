'use client';

import { Book } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import { PencilIcon } from '@heroicons/react/24/outline';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetBooksQuery, useUpdateBookMutation } from '../redux/api/apiSlice';
import { RootState } from '../redux/store';

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
  const [isOpen, setIsOpen] = useState(false);
  const [updateBook] = useUpdateBookMutation();
  const { refetch } = useGetBooksQuery();
  const { genres } = useSelector((state: RootState) => state.genres);
  
  // Find the genre name for display
  const genre = genres.find(g => g.id === book.genre.id);
  
  const [formData, setFormData] = useState({
    id: book.id,
    title: book.title,
    author: book.author,
    genreId: book.genre.id,
    status: book.status,
    coverImage: book.coverImage,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when book changes
  useEffect(() => {
    setFormData({
      id: book.id,
      title: book.title,
      author: book.author,
      genreId: book.genre.id,
      status: book.status,
      coverImage: book.coverImage,
    });
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedGenre = genres.find(g => g.id === formData.genreId);
      console.log(selectedGenre);
      
      await updateBook({
        id: formData.id,
        title: formData.title,
        author: formData.author,
        status: formData.status,
        coverImage: formData.coverImage,
        genreId: formData.genreId
      }).unwrap();

      setIsOpen(false);
      setIsSubmitting(false);
      refetch(); // Refresh the books data
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br from-blue-200 to-indigo-300 relative group">
      {/* Edit button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        aria-label="Edit book"
      >
        <PencilIcon className="h-5 w-5 text-blue-600" />
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

      {/* Edit Dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#e0f2fe] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-[#1e293b] mb-4"
                  >
                    Edit Book
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-[#1e293b]">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        required
                        className="mt-1 block w-full rounded-md border-[#60a5fa]/30 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] bg-white"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="author" className="block text-sm font-medium text-[#1e293b]">
                        Author
                      </label>
                      <input
                        type="text"
                        id="author"
                        required
                        className="mt-1 block w-full rounded-md border-[#60a5fa]/30 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] bg-white"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="genre" className="block text-sm font-medium text-[#1e293b]">
                        Genre
                      </label>
                      <select
                        id="genre"
                        required
                        className="mt-1 block w-full rounded-md border-[#60a5fa]/30 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] bg-white"
                        value={formData.genreId}
                        onChange={(e) => setFormData({ ...formData, genreId: parseInt(e.target.value) })}
                      >
                        <option value="">Select a genre</option>
                        {genres.map((genre) => (
                          <option key={genre.id} value={genre.id}>
                            {genre.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="coverImage" className="block text-sm font-medium text-[#1e293b]">
                        Cover Image URL
                      </label>
                      <input
                        type="url"
                        id="coverImage"
                        required
                        className="mt-1 block w-full rounded-md border-[#60a5fa]/30 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] bg-white"
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-[#1e293b]">
                        Status
                      </label>
                      <select
                        id="status"
                        required
                        className="mt-1 block w-full rounded-md border-[#60a5fa]/30 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] bg-white"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'to_read' | 'in_progress' | 'read' })}
                      >
                        <option value="to_read">To Read</option>
                        <option value="in_progress">In Progress</option>
                        <option value="read">Read</option>
                      </select>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="rounded-md border border-[#60a5fa]/30 bg-white px-4 py-2 text-sm font-medium text-[#1e293b] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center rounded-md border border-transparent bg-[#2563eb] px-4 py-2 text-sm font-medium text-white hover:bg-[#60a5fa] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
                      >
                        {isSubmitting ? 'Updating...' : 'Update Book'}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}; 