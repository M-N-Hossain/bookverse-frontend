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

export interface UpdateBook {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  status: Status;
  createdAt: string;
  genreId: number;
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