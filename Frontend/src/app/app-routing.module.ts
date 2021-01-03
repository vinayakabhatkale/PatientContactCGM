import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './shared/_layout/layout/layout.component';

import { RegisterComponent } from './auth/register/register.component';
import { LockscreenComponent } from './auth/lockscreen/lockscreen.component';
import { AuthGuard } from './shared/_helpers/auth.guard';
import { ErrorComponent } from './error/error.component';
import { View, Role } from './shared/_models';

import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'appointment',
        component: AppointmentComponent,
        data: { view: View.Dashboard }
      }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'lockscreen', component: LockscreenComponent },
  { path: 'error/:code', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
