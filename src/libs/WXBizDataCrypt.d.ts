import { WxDecryptData } from '../interfaces/wx.interface';

declare class WXBizDataCrypt {
  constructor(appId: string, sessionKey: string);

  decryptData(encryptedData: string, iv: string): WxDecryptData;
}

export = WXBizDataCrypt;