import type { ApiState } from '@models/api/api-state';
import type { Enum } from '@models/enum';
import { toApiStatus } from './extra-reducers';

export const newApiState = <T extends ApiState>(_enum: Enum) => {
  return {
    status: Object.values(_enum).reduce(
      (obj, _enum) => ({ ...obj, ...toApiStatus(_enum, null) }),
      {},
    ) as T['status'],
    error: Object.values(_enum).reduce(
      (obj, _enum) => ({ ...obj, [`${_enum}Error`]: null }),
      {},
    ) as T['error'],
  };
};
