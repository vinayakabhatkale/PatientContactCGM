import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { SessionService } from './session.service';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseURL = environment.baseURL;

  constructor(
    public http: HttpClient,
    private _spinner: NgxSpinnerService,
    private _message: MessageService,
    private _session: SessionService) { }

  public login(loginId: string, password: string, rememberme: boolean): Observable<any> {
    this._spinner.show('loginSpinner');
    return this.http.post(`${this.baseURL}/api/v1/auth/login`, { loginId, password }).pipe(
      map((x: any) => {

        this._spinner.hide('loginSpinner');
        if (x['code'] == "Authenticated") {
          console.log(x,"x");

          if (rememberme) {
            this._session.storeUserDetails(loginId, password, rememberme);
          } else {
            this._session.removeUserDetails();
          }
          this._session.login(x.data);
          return x.message;
        } else {
          if (!!x['message']) {
            this._message.showToast(x['message'], 'error');
          }
          return null;
        }
      }),
      tap(_ => console.log(`Login with - ${loginId}.`)),
      catchError(this.error)
    );
  }
/*
  public forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseURL}/api/v1/auth/forgotpassword`, { email }).pipe(
      map((x: any) => {
        return of(x.data);
      }),
      tap(_ => console.log(`Forgot Password of - ${email}.`)),
      catchError(this.error)
    );
  }

  public resetPassword(email: string, password: string): Observable<any> {
    const obj = {};
    return this.http.post(`${this.baseURL}/api/v1/auth/resetpassword`, { email, password }).pipe(
      map((x: any) => {
        return of(x.data);
      }),
      tap(_ => console.log(`Reset Password for - ${email}.`)),
      catchError(this.error)
    );
  } */

  // Handle Errors
  private error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
