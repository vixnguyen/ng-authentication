import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface GolMapModuleConfig {
  tokenGetter?: void;
  tokenName?: string;
  tokenDefault?: string;
  authProvider?: string;
  loginUri?: string;
}
export const AUTHENTICATION_MODULE_CONFIG = new InjectionToken<GolMapModuleConfig>('Authentication Configuration');

const ACCESS_TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class NgAuthenticationService {

  private moduleConfig: GolMapModuleConfig;
  logger = new Subject<boolean>();

  constructor(
    @Inject(AUTHENTICATION_MODULE_CONFIG) private readonly config: GolMapModuleConfig,
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {
    this.moduleConfig = config;
  }

  signout() {
    const currentUser = this.getUserInfo();
    localStorage.removeItem(ACCESS_TOKEN);
    this.logger.next(false);
  }

  async signin(body: any) {
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

  async signinPasswordless(params: any) {
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

  setToken(data?: any) {
    if (data) {
      localStorage.setItem(ACCESS_TOKEN, data[ACCESS_TOKEN]);
    }
    this.logger.next(true);
  }

  getToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  isAuthenticated() {
    let isAuthenticated: boolean;
    const token = this.getToken();
    if (this._isTokenInvalid() && this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem(ACCESS_TOKEN);
      isAuthenticated = false;
    } else {
      isAuthenticated = true;
    }
    return isAuthenticated;
  }

  isCurrentUser(uid: string) {
    const userInfo = this.getUserInfo();
    return uid == userInfo.uid;
  }

  getUserInfo() {
    if (this.isAuthenticated()) {
      const token = this.getToken();
      return this.jwtHelper.decodeToken(token);
    } else {
      return null;
    }
  }

  private _isTokenInvalid() {
    const token = this.getToken();
    if (!token) {
      return true;
    } else {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return true;
      }
    }
    return false;
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
