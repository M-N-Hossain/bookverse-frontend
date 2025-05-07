import { Book } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BooksState {
  books: Book[];
  filteredBooks: Book[];
  searchQuery: string;
}

const initialState: BooksState = {
  books: [],
  filteredBooks: [],
  searchQuery: '',
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
      state.filteredBooks = action.payload;
    },
    setFilteredBooks: (state, action: PayloadAction<Book[]>) => {
      state.filteredBooks = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      // Filter books based on search query
      if (action.payload) {
        const query = action.payload.toLowerCase();
        state.filteredBooks = state.books.filter(
          book => 
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
        );
      } else {
        state.filteredBooks = state.books;
      }
    },
  },
});

export const { setBooks, setFilteredBooks, setSearchQuery } = booksSlice.actions;
export default booksSlice.reducer; 