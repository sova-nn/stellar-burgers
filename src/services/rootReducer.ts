import { combineReducers } from '@reduxjs/toolkit';
import { rootSlice } from '../slices/rootSlice';

export const rootReducer = combineReducers({
  [rootSlice.name]: rootSlice.reducer
});
