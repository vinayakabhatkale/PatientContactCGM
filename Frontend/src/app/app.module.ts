import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgScrollbarModule } from 'ngx-scrollbar';


import { CommonDataService } from './common-data.service';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './shared/_layout/layout/layout.component';
import { RegisterComponent } from './auth/register/register.component';
import { LockscreenComponent } from './auth/lockscreen/lockscreen.component';

import { ModalComponent, ModalService } from './shared/_directives';

import { ToastaModule } from 'ngx-toasta';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { WebStorageModule } from 'ngx-store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AgmCoreModule } from '@agm/core';

import { DxVectorMapModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';

import { CKEditorModule } from 'ngx-ckeditor';

import { ChartsModule } from 'ng2-charts';

import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtInterceptor } from './shared/_helpers/jwt.interceptor';
import { ErrorInterceptor } from './shared/_helpers/error.interceptor';
import { ErrorComponent } from './error/error.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppointmentComponent } from './appointment/appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    RegisterComponent,
    LockscreenComponent,
    ModalComponent,  
    ErrorComponent,
    AppointmentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    ToastaModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    NgxDatatableModule,
    ColorPickerModule,
    NgScrollbarModule,
    NgxChartsModule,
    //AgmCoreModule.forRoot({ apiKey: 'AIzaSyDjVoaCW3PAn52C7WPpJ7NBBqU1_TUfnSI' }),
    DxVectorMapModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    CKEditorModule,
    NgbModule,
    NgbModalModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    WebStorageModule,
    NgxSelectModule,
    BsDatepickerModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyD-aH0dEvP3KRkWYPBrz063ofBYAXaSbLQ' }) 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CommonDataService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
