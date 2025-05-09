export type Status = 'to_read' | 'in_progress' | 'read';

export interface Genre {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  status: Status;
  createdAt: string;
  genre: Genre;
}

// Used for adding a new book
export interface BookInput {
  title: string;
  author: string;
  coverImage: string;
  status: Status;
  genreId: number;
}

// Used for updating an existing book
export interface BookUpdate {
  id: number;
  title?: string;
  author?: string;
  coverImage?: string;
  status?: Status;
  genreId?: number;
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