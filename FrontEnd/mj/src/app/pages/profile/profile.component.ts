import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/infrastruct/store/store-root.module';
import { SecurityUserAccountLoadAction } from 'src/app/infrastruct/store/account-user/account-user.actions';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent implements OnInit {
  employee: any;
  colCountByScreen: object;
  fullName: string;
  constructor( private _store: Store<IAppStore>) {
    this.employee = {
      Email: 'Sandra',
      NickName: 'Johnson',
      Password: 'Mrs.',
      Country: 'Controller',
      Town: 'images/employees/06.png'
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 1,
      md: 1,
      lg: 1
    };
  }
  ngOnInit() {
    this._store.dispatch(new SecurityUserAccountLoadAction());
    this._store.select(m=> m.securityUserAccountStore).subscribe(z=> this.fullName = z.firstName);

 }
}
