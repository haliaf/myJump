import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/infrastruct/store/store-root.module';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title: string;

  userMenuItems = [{
    text: 'Моя страница',
    icon: 'user',
    onClick: () => {
      this.router.navigate(['profile']);
    }
  }, {
    text: 'Выйти',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    }
  }];
  store$ = this._store.select(s => s.securityUserAccountStore);
  constructor(private authService: AuthService, private router: Router, private _store: Store<IAppStore>) { }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
