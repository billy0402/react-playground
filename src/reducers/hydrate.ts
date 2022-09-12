import type { AppState } from '@models/store';
import { createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const hydrate = createAction<AppState>(HYDRATE);

export default hydrate;
