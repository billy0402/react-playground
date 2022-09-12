import { PageLayoutType } from '@enums/page-layout-type';
import { createSlice } from '@reduxjs/toolkit';

type LayoutState = {
  pageLayoutType: PageLayoutType;
};

const initialState: LayoutState = {
  pageLayoutType: PageLayoutType.CLIENT,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setPageLayoutType: (state, action) => {
      state.pageLayoutType = action.payload;
    },
  },
});

export const { setPageLayoutType } = layoutSlice.actions;
export default layoutSlice.reducer;
