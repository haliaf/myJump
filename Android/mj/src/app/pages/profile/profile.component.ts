import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/infrastruct/store/store-root.module';
import { SecurityUserAccountLoadAction } from 'src/app/infrastruct/store/account-user/account-user.actions';
import { ViewInputBlock } from 'src/app/shared/components/_default/ViewInputBlock';
import { ISecurityUserAccountModel } from 'src/app/infrastruct/store/account-user/account-user.model';
import { AuthService } from 'src/app/shared/services';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent extends ViewInputBlock<ISecurityUserAccountModel> implements OnInit {
  employee: any;
  colCountByScreen: object;
  fullName: string;
  store$ = this._store.select(s => s.securityUserAccountStore);
  uploadHeader = {
    'Authorization': `Bearer ${this.authService.currentUserTokenValue}`
  };
  changeButtonOptions: any = {
    text: 'Сохранить',
    type: 'normal',
    width: '45%',
    onClick : 'changeUserProfile($event)',
    useSubmitBehavior: false
 };
  constructor( private _store: Store<IAppStore>, private authService: AuthService){
    super(_store);
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
    this.initStoreForAutoChange('securityUserAccountStore',  'SECURITY_USER_REGISTER_CHANGE');

 }


 uploadComplete(e){
  console.log('worked');
  this._store.dispatch(new SecurityUserAccountLoadAction());
 }

 changeUserProfile(e){
   console.log('worked');
   return true;
 }
}
