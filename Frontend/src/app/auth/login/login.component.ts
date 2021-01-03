import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/_services';
import { SessionService } from 'src/app/shared/_services/session.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDataService } from 'src/app/common-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  protected username: string;
  protected password: string;
  protected rememberme: boolean = false;

  private returnUrl: string;
  private notifier = new Subject();

  constructor(
    public _commondata: CommonDataService,
    private _auth: AuthService,
    private _session: SessionService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  //  this._commondata.showLoader(true);
    // remember me
    if (this._session.rememberedUser()) {
      const data = this._session.getRemember();
      this.username = data.username;
      this.password = data.password;
      this.rememberme = true;
    }

    // get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    console.log('this.returnUrl',this.returnUrl);
    const observable$ = this._session.isLoggedIn();
   /* observable$.pipe(takeUntil(this.notifier))
      .subscribe(x => {
        if (x) {
         // this.router.navigate([this.returnUrl]);
        }
      }); */

   // setTimeout(_ => this._commondata.showLoader(false), 1000);
  }

  onSubmit() {
  //  alert('in onsubmit');
   if((this.username=="admin" && this.password=="password")){
   //alert('success');
      this.router.navigate([`/appointment`]);
    } 
  //  this._auth.login(this.username, this.password, this.rememberme).subscribe((result) => {
  //    if(result!=null){
  //    console.log(result,"resulttt");
  //   this.router.navigate([`/dashboard`]);
  // }
  //  });
  }
 
  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }

}
