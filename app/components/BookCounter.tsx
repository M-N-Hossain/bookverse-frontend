import { Book } from '@/types';

interface BookCounterProps {
  books: Book[];
}

export const BookCounter: React.FC<BookCounterProps> = ({ books }) => {
  const stats = {
    total: books.length,
    toRead: books.filter(book => book.status === 'to_read').length,
    inProgress: books.filter(book => book.status === 'in_progress').length,
    read: books.filter(book => book.status === 'read').length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="card">
        <h3 className="text-sm font-medium text-[#1e3a8a]">Total Books</h3>
        <p className="mt-1 text-2xl font-semibold text-blue-800">{stats.total}</p>
      </div>
      
      <div className="card">
        <h3 className="text-sm font-medium text-[#1e3a8a]">To Read</h3>
        <p className="mt-1 text-2xl font-semibold text-blue-800">{stats.toRead}</p>
      </div>
      
      <div className="card">
        <h3 className="text-sm font-medium text-[#1e3a8a]">In Progress</h3>
        <p className="mt-1 text-2xl font-semibold text-yellow-800">{stats.inProgress}</p>
      </div>
      
      <div className="card">
        <h3 className="text-sm font-medium text-[#1e3a8a]">Read</h3>
        <p className="mt-1 text-2xl font-semibold text-green-800">{stats.read}</p>
      </div>
    </div>
  );
}; 