import { Genre } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddBookMutation } from '../redux/api/apiSlice';
import { RootState } from '../redux/store';

interface CreateBookFormProps {
  onBookCreated: () => void;
}

export const CreateBookForm: React.FC<CreateBookFormProps> = ({ onBookCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addBook] = useAddBookMutation();
  const { genres } = useSelector((state: RootState) => state.genres);
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genreId: '',
    status: 'to_read' as const,
    coverImage: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addBook({
        ...formData,
        genreId: parseInt(formData.genreId),
      }).unwrap();

      setIsOpen(false);
      setFormData({
        title: '',
        author: '',
        genreId: '',
        status: 'to_read',
        coverImage: '',
      });
      onBookCreated();
    } catch (error) {
      console.error('Error creating book:', error);
      alert('Failed to create book. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2563eb] hover:bg-[#60a5fa] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb]"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add Book
      </button>

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
                    Add New Book
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
                        className="inline-flex justify-center rounded-md border border-[#60a5fa]/30 bg-white px-4 py-2 text-sm font-medium text-[#475569] hover:bg-[#f4f9ff] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center rounded-md border border-transparent bg-[#2563eb] px-4 py-2 text-sm font-medium text-white hover:bg-[#60a5fa] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
                      >
                        {isSubmitting ? 'Creating...' : 'Create Book'}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}; 