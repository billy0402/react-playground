import type { Enum } from '@models/enum';

type ApiStatusType = 'loading' | 'success' | 'failed';

type ApiState<E extends keyof Enum = keyof Enum> = {
  error: { [key in E as `${key}Error`]: string | null };
  status: {
    [key in E as `${key}${Capitalize<ApiStatusType>}`]: boolean;
  };
};

export type { ApiStatusType, ApiState };
