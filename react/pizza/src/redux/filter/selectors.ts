import { RootState } from '../store';

export const selectSort = (state: RootState) => state.filterSlice.sort;
export const selectFilterSlice = (state: RootState) => state.filterSlice;
