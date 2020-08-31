import { AppSpinnerModule } from './../app-spinner/app-spinner.component';
import { navigation } from './../../../app-navigation';
import { Component, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { AuthService, AppInfoService } from '../../services';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxScrollViewModule, DxValidationSummaryModule, DxValidationSummaryComponent, DxTemplateDirective } from 'devextreme-angular';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  login = '';
  validationMessage: string;
  password = '';
  isLoginStart = false;
  constructor(private authService: AuthService, public appInfo: AppInfoService, private router: Router) {
  }

  onRegisterClick() {
    this.router.navigate(['signup']);
  }
  onLoginClick(args) {
    this.validationMessage = null;
    if (!args.validationGroup.validate().isValid) {
      return;
    }

    this.authService.logIn(this.login, this.password, err => {
      console.log(err);
      if (err.status === 401) {
        this.validationMessage = 'Не верный логин или пароль.';
      }
      this.isLoginStart = false;
    });
    this.isLoginStart = true;

    args.validationGroup.reset();
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AppSpinnerModule,
    DxButtonModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxScrollViewModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxValidationSummaryModule,

  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormModule { }
