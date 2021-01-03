import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, forkJoin,Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from './session.service';
import { HelperService } from './helper.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root' 
})
export class AppointmentService {
  private readonly baseURL = environment.baseURL;
  constructor(
    public http: HttpClient,
    private _spinner: NgxSpinnerService,
    private _message: MessageService,
    private _session: SessionService,
    private _helper: HelperService) {
  }


 

public getappointment(request): Observable<any> {
  this._spinner.show('layoutSpinner');

   return this.http.post(`${this.baseURL}/api/v1/Allow/AppointmentGetAll`,request).pipe(
   map((x: any) => {
    this._spinner.hide('layoutSpinner');   
    //this._helper.getJSON(x.data)
    return x['data'];
  }),
     tap(_ => console.log(`fetched appointment list.`)),
     catchError(this.error)
   );
 }

public getappointmentById(appointmentId: number): Observable<any> {
  this._spinner.show('layoutSpinner');

  return this.http.get(`${this.baseURL}/api/v1/Allow​/AppointmentGetById?id=${appointmentId}`).pipe(
    map((x: any) => {
      this._spinner.hide('layoutSpinner');   
      //this._helper.getJSON(x.data)
      return x['data'];
    }),    tap(_ => console.log(`fetched appointment list.`)),
    catchError(this.error)
  );
}
  
 public addappointment(appointment): Observable<any> {
    this._spinner.show('layoutSpinner');
   // return this.http.post(`${this.baseURL}/api/v1/Allow​/AppointmentCreate`, appointment).pipe(
    return this.http.post(`https://healthcare.azurewebsites.net/api/v1/Allow/AppointmentCreate`, appointment).pipe(
  
   map((x: any) => { 
        this._spinner.hide('layoutSpinner');
        this._message.showToast(x['message'], 'success');         
        return x['data'];
      
      }),
      tap(_ => console.log('add appointment.')),
      catchError(this.error)
    );
  }

  
  public updateappointment(appointment): Observable<any> {
    this._spinner.show('layoutSpinner');
    return this.http.put(`${this.baseURL}/api/v1/Allow/AppointmentUpdate`, appointment).pipe(
      map((x: any) => {
        this._spinner.hide('layoutSpinner');
          this._message.showToast(x['message'], 'success');
          return x['data'];
        
      }),
      tap(_ => console.log(`update appointment ${appointment.id}.`)),
      catchError(this.error)
    );
  }

  public deleteappointment(appointment): Observable<any> {
    this._spinner.show('layoutSpinner');
    return this.http.delete(`${this.baseURL}/api/v1/Allow/DeleteById?id=${appointment.id}`).pipe(
      map((x: any) => {
 
         this._spinner.hide('layoutSpinner');

          this._message.showToast(x['message'], 'success');
          return x['data'];
        
      }),
      tap(_ => console.log('fetched appointments.')),
      catchError(this.error)
    );
  }

  

  // Handle Errors
  error(error: HttpErrorResponse) {
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
