import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchQuery: string;
  selectedGenreId: number | null;
}

const initialState: FilterState = {
  searchQuery: '',
  selectedGenreId: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedGenreId: (state, action: PayloadAction<number | null>) => {
      state.selectedGenreId = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedGenreId = null;
    },
  },
});

export const { setSearchQuery, setSelectedGenreId, resetFilters } = filterSlice.actions;
export default filterSlice.reducer; 