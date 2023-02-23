import { createSlice } from '@reduxjs/toolkit';

const initState = {
  loading: false,
  totalNotes: 0,
  notes: [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState: initState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, actions) {
      state.loading = false;
      state.totalNotes = actions.payload.totalNotes;
      state.notes = actions.payload.notes;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    setTotalNotes(state, actions) {
      state.totalNotes = actions.payload;
    },
    setNotes(state, actions) {
      state.notes = actions.payload;
    },
  },
});

// Actions
export const homeActions = homeSlice.actions;

// Sellectors
export const selectLoading = (state) => state.home.loading;
export const selectTotalNotes = (state) => state.home.totalNotes;
export const selectNotes = (state) => state.home.notes;

// Reducers
const homeReducer = homeSlice.reducer;
export default homeReducer;
