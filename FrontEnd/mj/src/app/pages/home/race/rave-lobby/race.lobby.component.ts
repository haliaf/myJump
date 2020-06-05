
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/infrastruct/store/store-root.module';
import { RaceEvent } from 'src/app/infrastruct/store/common/IMapEvent';
import { Router } from '@angular/router';
import { UserMapDisconnectMapEventResponseCompleteAction } from 'src/app/infrastruct/store/user-map/user-map.actions';


@Component({
  selector: 'app-race-lobby',
  templateUrl: './race.lobby.component.html',
  styleUrls: ['./race.lobby.component.scss']
})


export class RaceLobbyComponent implements OnInit {
  starCoulDown = 10;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onRaceEvent = new EventEmitter<number>();
  raceEvent: number;

  constructor(private _store: Store<IAppStore>, private _router: Router) { }

  ngOnInit() {
    this.raceEvent = 1;
  }
  finish() {
    this._store.dispatch(new UserMapDisconnectMapEventResponseCompleteAction());
  }
  start() {
    if (this.starCoulDown > 0) {
      setTimeout(() => {
        this.starCoulDown = this.starCoulDown - 1;
        this.start();
      }

        , 1000);

      console.log("tick");
    }
    else {
      this.onRaceEvent.emit(RaceEvent.startRace);
      this.raceEvent = RaceEvent.startRace;
    }
  }
}
