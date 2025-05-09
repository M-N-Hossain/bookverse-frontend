import { Book, BookInput, BookUpdate, Genre } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { useAddBookMutation, useGetGenresQuery, useUpdateBookMutation } from '../redux/api/apiSlice';
import { bookToasts } from '../utils/toast';

interface BookFormProps {
  onBookSaved: () => void;
  isEdit?: boolean;
  book?: Book;
  trigger?: React.ReactNode;
}

export const BookForm: React.FC<BookFormProps> = ({ onBookSaved, isEdit = false, book, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const { data: genres = [] } = useGetGenresQuery();
  
  const [formData, setFormData] = useState({
    id: book?.id || 0,
    title: book?.title || '',
    author: book?.author || '',
    genreId: book?.genre.id.toString() || '',
    status: book?.status || 'to_read' as const,
    coverImage: book?.coverImage || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (book) {
      setFormData({
        id: book.id,
        title: book.title,
        author: book.author,
        genreId: book.genre.id.toString(),
        status: book.status,
        coverImage: book.coverImage,
      });
    }
  }, [book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEdit && book) {
        const bookUpdate: BookUpdate = {
          id: formData.id,
          title: formData.title,
          author: formData.author,
          status: formData.status,
          coverImage: formData.coverImage,
          genreId: parseInt(formData.genreId)
        };
        
        await updateBook(bookUpdate).unwrap();
        bookToasts.updateSuccess();
      } else {
        const genreId = parseInt(formData.genreId);
        
        const bookInput: BookInput = {
          title: formData.title,
          author: formData.author,
          status: formData.status,
          coverImage: formData.coverImage,
          genreId: genreId
        };
        
        await addBook(bookInput).unwrap();
        bookToasts.createSuccess();
      }

      setIsOpen(false);
      if (!isEdit) {
        setFormData({
          id: 0,
          title: '',
          author: '',
          genreId: '',
          status: 'to_read',
          coverImage: '',
        });
      }
      onBookSaved();
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} book:`, error);
      if (isEdit) {
        bookToasts.updateError(error);
      } else {
        bookToasts.createError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only show the default trigger if no custom trigger is provided and we're not already open
  const defaultTrigger = isEdit ? (
    <button
      onClick={() => setIsOpen(true)}
      className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 z-10 cursor-pointer"
      aria-label="Edit book"
    >
      <PencilIcon className="h-5 w-5 text-blue-600" />
    </button>
  ) : (
    <button
      onClick={() => setIsOpen(true)}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2563eb] hover:bg-[#60a5fa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb]"
    >
      <PlusIcon className="h-5 w-5 mr-2" />
      Add Book
    </button>
  );

  return (
    <>
      {trigger ? (
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      ) : (
        defaultTrigger
      )}

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
            <div className="fixed inset-0 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-0"
              >
                <Dialog.Panel className="w-full max-w-md transform-none overflow-hidden rounded-2xl bg-[#bcdef5]/90 backdrop-blur-sm p-8 text-left align-middle shadow-xl transition-transform duration-150">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-[#1e293b] mb-6"
                  >
                    {isEdit ? 'Edit Book' : 'Add New Book'}
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-[#1e293b] mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        required
                        autoFocus
                        className="mt-1 block w-full rounded-md border-[#60a5fa]/30 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] bg-white/90 p-2.5"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="author" className="block text-sm font-medium text-[#1e293b] mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        id="author"
                        required
                        className="mt-1 block w-full rounded-md border-[#60a5fa]/30 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] bg-white/90 p-2.5"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="genre" className="block text-sm font-medium text-[#1e293b] mb-2">
                        Genre
                      </label>
                      <select
                        id="genre"
                        required
                        className="mt-1 block w-full rounded-md border-[#60a5fa]/30 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] bg-white/90 p-2.5"
                        value={formData.genreId}
                        onChange={(e) => setFormData({ ...formData, genreId: e.target.value })}
                      >
                        <option value="">Select a genre</option>
                        {genres.map((genre: Genre) => (
                          <option key={genre.id} value={genre.id}>
                            {genre.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="coverImage" className="block text-sm font-medium text-[#1e293b] mb-2">
                        Cover Image URL
                      </label>
                      <input
                        type={type}
                        id={id}
                        required
                        className="mt-1 block w-full rounded-md border-[#60a5fa]/30 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] bg-white/90 p-2.5"
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-[#1e293b] mb-2">
                        Status
                      </label>
                      <select
                        id="status"
                        required
                        className="mt-1 block w-full rounded-md border-[#60a5fa]/30 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] bg-white/90 p-2.5"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'to_read' | 'in_progress' | 'read' })}
                      >
                        <option value="to_read">To Read</option>
                        <option value="in_progress">In Progress</option>
                        <option value="read">Read</option>
                      </select>
                    </div>

                    <div className="mt-8 flex justify-end space-x-4">
                      <button
                        type="button"
                        className="rounded-md border border-[#60a5fa]/30 bg-white/90 px-5 py-2.5 text-sm font-medium text-[#1e293b] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center rounded-md border border-transparent bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#60a5fa] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
                      >
                        {isSubmitting ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Book' : 'Create Book')}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>

          </div>
        </div>
      </Dialog>
    </Transition>
  </>
  
  );
};

// Export CreateBookForm for backwards compatibility
export const CreateBookForm: React.FC<{ onBookCreated: () => void }> = ({ onBookCreated }) => {
  return <BookForm onBookSaved={onBookCreated} />;
}; 