import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface AuthModuleConfig {
  tokenGetter?: void;
  tokenName?: string;
  tokenDefault?: string;
  authProvider?: string;
  loginUri?: string;
}
export const AUTH_MODULE_CONFIG = new InjectionToken<AuthModuleConfig>('Authentication Configuration');

const ACCESS_TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class NgAuthenticationService {

  private moduleConfig: AuthModuleConfig;
  logger = new Subject<boolean>();

  constructor(
    @Inject(AUTH_MODULE_CONFIG) private readonly config: AuthModuleConfig,
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {
    this.moduleConfig = config;
  }

  async signIn(body: any) {
    const [url, queryParams] = this._constructRequest(this.moduleConfig.loginUri, body);
    let data: any = null;
    await this.http.post(url, queryParams).toPromise().then(
      (res: any) => {
        data = res;
        this.setToken(res);
      }).catch((err) => {
        this.logger.next(err);
      }
    );
    return data;
  }

  async signInWithLink(params: any) {
    const [url, queryParams] = this._constructRequest(this.moduleConfig.loginUri, params);
    let data: any = null;
    await this.http.get(url, queryParams).toPromise().then(
      (res: any) => {
        data = res;
        this.setToken(res);
      }).catch((err) => {
        data = err;
        this.logger.next(err);
      }
    );
    return data;
  }

  signOut() {
    this.removeToken();
    this.logger.next(false);
  }

  setToken(data?: any) {
    if (data) {
      localStorage.setItem(ACCESS_TOKEN, data[ACCESS_TOKEN]);
    }
    this.logger.next(true);
  }

  getToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  removeToken() {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  isAuthenticated() {
    const { isTokenValid } = this._verifyToken();
    return isTokenValid;
  }

  isCurrentUser(uid: string) {
    const userInfo = this.getUserInfo();
    return userInfo ? uid === userInfo['uid'] : false;
  }

  getUserInfo() {
    const { isTokenValid, token } = this._verifyToken();
    if (isTokenValid) {
      return this.jwtHelper.decodeToken(token);
    } else {
      return null;
    }
  }

  private _verifyToken() {
    const token: string | boolean = this.getToken();
    const isTokenValid: boolean = !this.jwtHelper.isTokenExpired(token);
    if (!isTokenValid) {
      this.removeToken();
    }
    return {isTokenValid, token};
  }

  private _constructRequest(uri: Array<any> | any, moreOptions?: object | any, fullRes?: boolean): any {
    const url = Array.prototype.concat(this.moduleConfig.authProvider, uri).join(String.fromCharCode(47));
    const paramsRequest = {};
    if (moreOptions) {
      Object.keys(moreOptions).forEach(x => {
        paramsRequest[`${x}`] = `${moreOptions[x]}`;
      });
    }
    return fullRes ? [url, { params: paramsRequest, observe: 'response' }] : [url, { params: paramsRequest }];
  }

}
