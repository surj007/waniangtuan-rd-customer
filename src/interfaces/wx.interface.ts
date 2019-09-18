export interface WxOpenIdAndSessionKeyReqIntreface {
  appid: string;
  secret: string;
  js_code: string;
}

export interface WxOpenIdAndSessionKeyResIntreface {
  session_key: string;
  openid: string;
}