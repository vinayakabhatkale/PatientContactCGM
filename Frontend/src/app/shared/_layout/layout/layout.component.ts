import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonDataService } from '../../../common-data.service';
import { SessionService } from '../../_services/session.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { LabelService } from '../../_services/label.service';
import { View } from '../../_models';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  isSearchActive: boolean = false;
  isSlideMenu: boolean = true;

  public userInfo: any = {};
  public commonLabels$: Observable<{ [key: string]: string }>;
  private notifier = new Subject();

  constructor(
    public _commondata: CommonDataService,
    private _session: SessionService,
    private _user: UserService,
    private router: Router,
    private _label: LabelService) { }

  ngOnInit() {
    // this._commondata.showLoader(true);

    // load common labels
   /* this._label.getLabelsByViewandLanguage(View.Dashboard);

    this._label.labelNotifier().subscribe(x => {
      if (x === View.Dashboard) {
        this.commonLabels$ = this._label.getLabels(View.Dashboard);
      }
    }); */

    // monitor user session
    const observable$ = this._session.isLoggedIn();
    observable$.pipe(takeUntil(this.notifier))
      .subscribe(x => {
        if (!x) {
         // this.router.navigate(['/']);
        }
      });

    // get current user info
   /* this._user.getDetails().subscribe((result) => {
      this.userInfo = result;
    }); */
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

  toggleMenu() {
    this.isSlideMenu = !this.isSlideMenu;
  }

  expandCollpse(sectionName) {
    const CurrentCls = document.getElementById(sectionName).getAttribute('class');
    if (CurrentCls === 'collapse' || CurrentCls === 'collapse hide') {
      document.getElementById(sectionName).setAttribute('class', 'collapse show');
      document.getElementById(sectionName).previousElementSibling.setAttribute('aria-expanded', 'true');
    } else {
      document.getElementById(sectionName).setAttribute('class', 'collapse hide');
      document.getElementById(sectionName).previousElementSibling.setAttribute('aria-expanded', 'false');
    }
  }

  toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (!document['fullscreenElement'] && !document['mozFullScreenElement'] &&
      !document['webkitFullscreenElement'] && !document['msFullscreenElement']) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element['ALLOW_KEYBOARD_INPUT']);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document['msExitFullscreen']) {
        document['msExitFullscreen']();
      } else if (document['mozCancelFullScreen']) {
        document['mozCancelFullScreen']();
      } else if (document['webkitExitFullscreen']) {
        document['webkitExitFullscreen']();
      }
    }
  }

  public logout() {
    this._session.logout();
    this.router.navigate([`/`]);

  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
