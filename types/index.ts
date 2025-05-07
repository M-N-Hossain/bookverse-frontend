export type Status = 'to_read' | 'in_progress' | 'read';

export interface Genre {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  genreId: string;
  genreName: string;
  status: Status;
  description?: string;
  addedDate: string;
  modifiedDate?: string;
}

export interface BookState {
  books: Book[];
  filteredBooks: Book[];
  selectedGenre: string | null;
  searchQuery: string;
}

export interface GenreState {
  genres: Genre[];
  isLoading: boolean;
  error: string | null;
} 