import { RaceMapComponent } from './pages/home/race/race.map.component';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DxDataGridModule, DxFormModule, DxLoadIndicatorModule, DxScrollViewModule, DxButtonModule, DxFileUploaderModule, DxTabPanelModule } from 'devextreme-angular';
import { SingleCardComponent } from './layouts';
import { DisplayDataComponent } from './pages/display-data/display-data.component';
import { HomeComponent } from './pages/home/home.component';
import { MainMapComponent } from './pages/home/main-map/main.map.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginFormComponent } from './shared/components';
import { AppSpinnerComponent, AppSpinnerModule } from './shared/components/app-spinner/app-spinner.component';
import { GoogleMapComponent } from './shared/components/google-map/google-map.component';
import { AuthGuardService } from './shared/services';
import { LobbyMainMapComponent } from './pages/home/lobby-main-map/lobby.main.map.component';
import { GoogleMapRaceComponent } from './shared/components/google-map-race/google-map-race.component';
import { RaceLobbyComponent } from './pages/home/race/rave-lobby/race.lobby.component';
import { FaceBookRegisterComponent } from './pages/register/register-fb/face-book-register/face-book-register.component';


const routes: Routes = [
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'display-data',
    component: DisplayDataComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'home',
    canActivate: [AuthGuardService]
  }

];

@NgModule({
  // tslint:disable-next-line: max-line-length
  imports: [RouterModule.forRoot(routes), DxDataGridModule,
                                          DxFormModule,
                                          DxScrollViewModule,
                                          DxTabPanelModule,
                                          DxLoadIndicatorModule,
                                          DxButtonModule,
                                          AppSpinnerModule,
                                          DxFileUploaderModule,
                                          CommonModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  // tslint:disable-next-line: max-line-length
  declarations: [ HomeComponent,
                  ProfileComponent,
                  DisplayDataComponent,
                  MainMapComponent,
                  RaceMapComponent,
                  LobbyMainMapComponent,
                  GoogleMapComponent,
                  GoogleMapRaceComponent,
                  RaceLobbyComponent,
                  SingleCardComponent]
})
export class AppRoutingModule { }
