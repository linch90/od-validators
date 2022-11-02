import { SurfaceConditionLimit } from './surface-condition-limit.enum';
import { TailWindComponentLimitInKt } from './tail-wind-component-limit-in-kt.enum';

export interface AirportLimitWeightDto {
  airportIcaoIdentifier?: string;
  hasTakeoffWeightLimit: boolean;
  mtowInKg?: number;
  hasLandingWeightLimit: boolean;
  mlwInKg?: number;
  takeoffSurfaceConditionLimit?: SurfaceConditionLimit;
  takeoffTailWindComponentLimitInKt?: TailWindComponentLimitInKt;
  landingSurfaceConditionLimit?: SurfaceConditionLimit;
  landingTailWindComponentLimitInKt?: TailWindComponentLimitInKt;
  remark?: string;
  aircraftTypeId?: string;
}
