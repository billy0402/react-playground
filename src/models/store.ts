import type { ThunkAction } from '@reduxjs/toolkit';
import { makeStore } from '@store';
import type { Action } from 'redux';

type AppStore = ReturnType<typeof makeStore>;
type AppState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export type { AppStore, AppDispatch, AppState, AppThunk };
