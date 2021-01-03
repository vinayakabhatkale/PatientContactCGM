import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { SessionService } from '../_services/session.service';
import { UserService } from '../_services/user.service';
import { LabelService } from '../_services/label.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private _session: SessionService,
    private _user: UserService,
    private _label: LabelService
  ) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const hasToken = this._session.hasToken();

    if (hasToken) {
      // check if route is restricted by view
      // if (route.data.view != null && !this._user.hasViewAccess(route.data.view)) {
      //   // role not authorised so redirect to home page
      //   this.router.navigate(['/error/404']);
      //   return false;
      // }
      // if (route.data.view != null) {
          //   this._label.getLabelsByViewandLanguage(route.data.view);
      // }
      return true;
    }
    else{
      return true;
    }
    // not logged in so redirect to login page with the return url
    //this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
  //  return true;
  }
}
