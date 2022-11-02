import { mapEnumToOptions } from '../utils/form-utils';

export enum SurfaceConditionLimit {
  Dry = 0,
  Wet = 1,
}

export const surfaceConditionLimitOptions = mapEnumToOptions(
  SurfaceConditionLimit
);
