import { Injectable } from '@angular/core';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from './message.service';
import { SessionService } from './session.service';
import { LocalStorageService } from 'ngx-store';
import { map, tap, catchError } from 'rxjs/operators';
import { Label, View } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private readonly baseURL = environment.baseURL;
  public labelList: Array<Label> = [];
  private isLabelSubject = new BehaviorSubject<string>('');

  constructor(
    public http: HttpClient,
  //  private _spinner: NgxSpinnerService,
    private _message: MessageService,
    private _session: SessionService,
    private _localService: LocalStorageService) { }

 /* public getLabelsByViewandLanguage(viewName) {
    const languageCode = 'EN';

    this.http.post(`${this.baseURL}/api/v1/label/getlabeldetailsbyviewandlanguage`, { languageCode, viewName }).pipe(
      map((x: any) => {
        return x.data;
      }),
      tap(_ => console.log(`get labels for ${viewName}.`)),
      catchError(this.error)
    ).subscribe(result => {
      const labels: { [key: string]: string } = result.reduce((op, inp) => {
        const key = inp['labelKey'];
        const value = inp['labelValue'];
        op[`${key}`] = value;
        return op;
      }, {});

      if (this.labelList.findIndex(x => x.view === viewName) === -1) {
        this.labelList.push({ view: viewName, lable: labels });
      } else {
        this.labelList.map(x => x.view === viewName ? { ...x, lable: labels } : x);
      }
      this.isLabelSubject.next(viewName);
    });
  }

  public getLabels(viewName): Observable<{ [key: string]: string }> {
    if (this.labelList.findIndex(x => x.view === viewName) !== -1) {
      if (this.labelList.findIndex(x => x.view === View.Dashboard) !== -1) {
        // prepare list
        return of(Object.assign(
          { ...this.labelList.find(x => x.view === viewName)['lable'] },
          { ...this.labelList.find(x => x.view === View.Dashboard)['lable'] }
        ));
      }
      this.getLabelsByViewandLanguage(View.Dashboard);
      return of(Object.assign({ ...this.labelList.find(x => x.view === viewName)['lable'] }));
    }
    return of();
  } 

  public labelNotifier(): Observable<string> {
    return this.isLabelSubject.asObservable();
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
