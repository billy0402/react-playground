import { ReducerName } from '@enums/reducer-name';
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from '@models/api/api-action-type';
import type { ApiState, ApiStatusType } from '@models/api/api-state';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';

const getActionType = (value: string, prefix: string) =>
  value.substring(prefix.length).split('/')[1];

export const toApiStatus = (
  actionType: string,
  apiStatusType: ApiStatusType | null,
) => ({
  [`${actionType}Loading`]: apiStatusType === 'loading',
  [`${actionType}Success`]: apiStatusType === 'success',
  [`${actionType}Failed`]: apiStatusType === 'failed',
});

export const asyncMatcher = (
  builder: ActionReducerMapBuilder<ApiState>,
  reducerName: ReducerName,
) => {
  builder
    .addMatcher(isPendingAction(reducerName), (state, action) => {
      const actionType = getActionType(action.type, reducerName);
      state.status = {
        ...state.status,
        ...toApiStatus(actionType, 'loading'),
      };
    })
    .addMatcher(isFulfilledAction(reducerName), (state, action) => {
      const actionType = getActionType(action.type, reducerName);
      state.status = {
        ...state.status,
        ...toApiStatus(actionType, 'success'),
      };
    })
    .addMatcher(isRejectedAction(reducerName), (state, action) => {
      const actionType = getActionType(action.type, reducerName);
      state.status = {
        ...state.status,
        ...toApiStatus(actionType, 'failed'),
      };
      state.error = {
        ...state.error,
        [`${actionType}Error`]: (action.error as Error)?.message,
      };
    });
};
