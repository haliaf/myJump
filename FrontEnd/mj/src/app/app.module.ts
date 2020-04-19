import { SecurityUserEffects } from './infrastruct/store/security-user/security-user.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
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
    SingleCardModule,
    FooterModule,
    LoginFormModule,
    AppRoutingModule,

    StoreModule.forRoot(StoreMainModule.model),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([ SecurityUserEffects])
  ],
  providers: [AuthService, ScreenService, AppInfoService,
    {
      provide: HTTP_INTERCEPTORS,
      // Этим interceptor`ом будем добавлять auth header
      useClass: JwtInterceptor,
      multi: true
    }/*
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
