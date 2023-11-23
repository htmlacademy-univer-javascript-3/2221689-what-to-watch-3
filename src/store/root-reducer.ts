import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { filmData } from './film-data/film-data';
import { reviewData } from './reviews-data/reviews-data';

export const rootReducer = combineReducers({
  [NameSpace.Films]: filmData.reducer,
  [NameSpace.Comments]: reviewData.reducer,
  [NameSpace.User]: userProcess.reducer,
});
