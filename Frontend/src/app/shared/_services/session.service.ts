import { Injectable } from '@angular/core';
import { CookiesStorageService } from 'ngx-store';
import * as jwt_decode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private _cookiesStorage: CookiesStorageService) { }

  public login(token: string) {
    this._cookiesStorage.set('session', token, new Date(new Date().getTime() + 60 * 60 * 24 * 1000));
    this.isLoginSubject.next(true);
  }

  storeUserDetails(username, password, remember) {
    this._cookiesStorage.set('username', username);
    // this._cookiesStorage.set('password', password);
    this._cookiesStorage.set('remember', remember);
  }

  removeUserDetails() {
    this._cookiesStorage.remove('username');
    // this._cookiesStorage.remove('password');
    this._cookiesStorage.set('remember', false);
  }

  getRemember(): { username: string, password: string } {
    return {
      username: this._cookiesStorage.get('username'),
      password: '' // this._cookiesStorage.get('password')
    };
  }

  rememberedUser(): boolean {
    return this._cookiesStorage.get('remember') || false;
  }

  public getRootId() {
    return this.getUserSessionDetails()['RootId'];
  }

  public getUserSessionDetails() {
    const token = this._cookiesStorage.get('session');
    return jwt_decode(token);
  }

  public getToken() {
    return this._cookiesStorage.get('session');
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  public logout(): void {
    this._cookiesStorage.remove('session');
    this.isLoginSubject.next(false);
  }

  public hasToken(): boolean {
    return !!this._cookiesStorage.get('session');
  }
}
