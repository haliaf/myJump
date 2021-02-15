import { Component, OnInit, Input } from '@angular/core';

import { IAppStore } from 'src/app/infrastruct/store/store-root.module';
import { Store } from '@ngrx/store';
import { UserMapActionTypes, UserMapLoadAction, UserMapLoadCoordinateAction } from 'src/app/infrastruct/store/user-map/user-map.actions';

@Component({
  selector: 'app-lobby-main-map',
  templateUrl: './lobby.main.map.component.html',
  styleUrls: ['./lobby.main.map.component.scss']
})

export class LobbyMainMapComponent implements OnInit {
  @Input()
  tabSelected: boolean;
  createStarted = false;
  resizedImage: string;
  store$ = this._store.select(s => s.securityUserAccountStore);
  constructor(private _store: Store<IAppStore>) { }

  ngOnInit() {

  }
  onStartCreate(){
    this.createStarted = true;
  }
  createMapLatLng(){
     this._store.dispatch(new UserMapLoadCoordinateAction());
  }

}
