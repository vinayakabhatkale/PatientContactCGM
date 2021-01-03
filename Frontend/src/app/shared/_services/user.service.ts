import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { SessionService } from './session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'ngx-store';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseURL = environment.baseURL;

  constructor(
    public http: HttpClient,
  //  private _spinner: NgxSpinnerService,
    private _message: MessageService,
    private _session: SessionService,
    private _localService: LocalStorageService) { }

 /* public getDetails() {
    return this.http.get(`${this.baseURL}/api/v1/user/getcurrentuserinfo`).pipe(
      map((x: any) => {
        if (x['status'] === 'success') {
          this.setViewList(x['data']['viewList'] as Array<any>);
          return x['data'];
        } else {
          if (!!x['message']) {
            this._message.showToast(x['message'], 'error');
          }
          return null;
        }
      }),
      tap(_ => console.log(`get current user info.`)),
      catchError(this.error)
    );
  }

  public hasViewAccess(code: string): boolean {
    const list = this.getViewList();
    if (list.length > 0) {
      return list.findIndex(x => x['viewname'].toLowerCase() === code.toLowerCase()) !== -1 ;
    }
    return false;
  }

  private setViewList(views: Array<any>) {
    this._localService.set('views', views);
  }

  private getViewList(): Array<any> {
    return this._localService.get('views');
  }

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
  } */
}
