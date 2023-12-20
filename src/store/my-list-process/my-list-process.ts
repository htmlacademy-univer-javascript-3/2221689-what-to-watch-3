import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { MyListProcess } from '../../types/state.props';
import { changeFavoriteFilms, fetchFavoriteFilms } from '../api-actions';

const initialState: MyListProcess = {
  favoriteFilms: [],
  favoriteFilmsCount: 0,
  favoriteFilmsFetchingStatus: RequestStatus.Idle,
  changeFavoriteFilmsFetchingStatus: RequestStatus.Idle
};

export const myListProcess = createSlice({
  name: NameSpace.MyList,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteFilms.pending, (state) => {
        state.favoriteFilmsFetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilmsFetchingStatus = RequestStatus.Success;
        state.favoriteFilms = action.payload;
        state.favoriteFilmsCount = action.payload.length;
      })
      .addCase(fetchFavoriteFilms.rejected, (state) => {
        state.favoriteFilmsFetchingStatus = RequestStatus.Error;
      })
      .addCase(changeFavoriteFilms.pending, (state) => {
        state.changeFavoriteFilmsFetchingStatus = RequestStatus.Pending;
      })
      .addCase(changeFavoriteFilms.fulfilled, (state, action) => {
        state.changeFavoriteFilmsFetchingStatus = RequestStatus.Success;
        state.favoriteFilmsCount += action.payload;
      })
      .addCase(changeFavoriteFilms.rejected, (state) => {
        state.changeFavoriteFilmsFetchingStatus = RequestStatus.Error;
      });
  }
});

