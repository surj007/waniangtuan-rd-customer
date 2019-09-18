export interface WxLocationInterface {
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number;
  readonly accuracy: number;
  readonly horizontalAccuracy: number;
  readonly verticalAccuracy: number;
}