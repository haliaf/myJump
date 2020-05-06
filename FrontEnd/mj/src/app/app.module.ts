import { SecurityUserEffects } from './infrastruct/store/security-user/security-user.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule } from './layouts';
import { FooterModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreMainModule } from './infrastruct/store/store-root.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './infrastruct/interceptors/JwtInterceptor';
import { RegisterComponentFormModule } from './pages/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterUserEffects } from './infrastruct/store/register-user/register-user.effects';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppSpinnerComponent, AppSpinnerModule } from './shared/components/app-spinner/app-spinner.component';
import { SecurityUserAccountEffects } from './infrastruct/store/account-user/account-user..effects';


export function tokenGetter() {
  return localStorage.getItem('auth_token');
}
//AIzaSyDXKQwnYtbILKa-SAK4IZypJivKWTBKw38 googleMapsKey
@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    FooterModule,
    LoginFormModule,

    RegisterComponentFormModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(StoreMainModule.model),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([ SecurityUserEffects, RegisterUserEffects, SecurityUserAccountEffects]),
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [AuthService, ScreenService, AppInfoService,

    {
      provide: HTTP_INTERCEPTORS,
      // Этим interceptor`ом будем добавлять auth header
      useClass: JwtInterceptor,
      multi: true
    },
    /* {
      provide: HTTP_INTERCEPTORS,
      // этим будем соответственно рефрешить
      useClass: RefreshTokenInterceptor,
      multi: true
    }

    {
         provide: HTTP_INTERCEPTORS,
         useClass: ErrorRequestInterceptor,
         multi: true
      },
    {
      provide: HTTP_INTERCEPTORS,
      // этим будем соответственно рефрешить
      useClass: RefreshTokenInterceptor,
      multi: true
    }*/],
  exports: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
