import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Input, NgModule, OnInit, Renderer2, CUSTOM_ELEMENTS_SCHEMA, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
// tslint:disable-next-line: max-line-length
import { DxButtonModule, DxCheckBoxModule, DxDateBoxModule, DxFormModule, DxScrollViewModule, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule, DxValidationGroupModule, DxValidatorModule, DxLoadIndicatorModule } from 'devextreme-angular';
import { RegisterUserResponseAction } from 'src/app/infrastruct/store/register-user/register-user.actions';
import { IAppStore } from 'src/app/infrastruct/store/store-root.module';
import { ViewInputBlock } from 'src/app/shared/components/_default/ViewInputBlock';
import { ViewInputBlockParam } from 'src/app/shared/components/_default/ViewInputBlockParam';
import { IRegisterUserSimpleInfoDto, IRegisterUserModel } from './../../infrastruct/store/register-user/register-user.model';
import { AppSpinnerComponent, AppSpinnerModule } from 'src/app/shared/components/app-spinner/app-spinner.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent extends ViewInputBlock<IRegisterUserSimpleInfoDto> implements OnInit, AfterContentInit {


  registerButtonOptions: any = {
    text: 'Зарегестрироваться',
    type: 'normal',
    width: '45%',
    useSubmitBehavior: true
 };
state: IRegisterUserModel;
store$ = this._store.select(s => s.securityUserRegisteStore);
userSettings$ = this._store.select(s => s.securityUserStore);


  // tslint:disable-next-line: max-line-length
  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private renderer2: Renderer2, private _store: Store<IAppStore>) {
    super(_store);
  }

  ngOnInit() {
    this.store$.subscribe((data: IRegisterUserModel) => this.state = data );
    this.injectScript();
  }

  ngAfterContentInit(){
    this.initStoreForAutoChange('securityUserRegisteStore',  'SECURITY_USER_REGISTER_CHANGE');
  }

  injectScript = () => {
    const srcScript = this.renderer2.createElement('script');
    srcScript.type = 'text/javascript';
    srcScript.text = `setTimeout(()=>{var video = document.querySelector('video');
                                          video.muted = true;
                                          video.play()}, 800)`;
    this.renderer2.appendChild(this.document.body, srcScript);
  }

  passwordComparison = () => {
    return this.state.password;
  }

  checkComparison = () => {
    return true;
  }

  register = () => {
    this._store.dispatch(new RegisterUserResponseAction());
  }

  closedRegister = () => {
    this.router.navigate(['/login-form']);
  }

  propChangeHandler(e){
    const updatedField = e.dataField.toLowerCase();
    const newValue = e.value;
    this.propOnChange(newValue, updatedField);
  }

}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxScrollViewModule,
    DxValidatorModule,
    DxValidationGroupModule,
    ReactiveFormsModule,
    MatCardModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule,
    FormsModule,
    FontAwesomeModule,
    MatInputModule,
    AppSpinnerModule

  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent]


})
export class RegisterComponentFormModule {

}

