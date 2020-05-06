import { Component, HostBinding } from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { Store } from '@ngrx/store';
import { IAppStore } from './infrastruct/store/store-root.module';
import { SecurityUserLoadAction } from './infrastruct/store/security-user/security-user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService
    , private _store: Store<IAppStore>) {
    }

  ngOnInit() {
      this._store.dispatch(new SecurityUserLoadAction());

   }
  isAutorized() {
    return this.authService.isLoggedIn;
  }
}
