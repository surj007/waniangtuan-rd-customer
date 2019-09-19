export interface WxOpenIdAndSessionKeyReqIntreface {
  appid: string;
  secret: string;
  js_code: string;
}

export interface WxOpenIdAndSessionKeyResIntreface {
  session_key: string;
  openid: string;
}

export interface WxLocationInterface {
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number;
  readonly accuracy: number;
  readonly horizontalAccuracy: number;
  readonly verticalAccuracy: number;
}

export interface WxDecryptData {
  readonly unionId: string;
  [ key: string ]: any;
}