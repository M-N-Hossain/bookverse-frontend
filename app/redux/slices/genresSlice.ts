import { Genre } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GenreState {
  genres: Genre[];
  selectedGenre: string | null;
}

const initialState: GenreState = {
  genres: [],
  selectedGenre: null,
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
    },
    setSelectedGenre: (state, action: PayloadAction<string | null>) => {
      state.selectedGenre = action.payload;
    },
  },
});

export const { setGenres, setSelectedGenre } = genresSlice.actions;
export default genresSlice.reducer; 