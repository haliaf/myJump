
import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/infrastruct/store/store-root.module';
import { RaceEvent } from 'src/app/infrastruct/store/common/IMapEvent';
import { Router } from '@angular/router';
import { UserMapDisconnectMapEventResponseCompleteAction, UserMapStartEventAction } from 'src/app/infrastruct/store/user-map/user-map.actions';
import { SignalRService } from 'src/app/infrastruct/signalR/service/signal-r.service';


@Component({
  selector: 'app-race-lobby',
  templateUrl: './race.lobby.component.html',
  styleUrls: ['./race.lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})


export class RaceLobbyComponent implements OnInit {
  starCoulDown = 10;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onRaceEvent = new EventEmitter<number>();
  raceEvent: number;

  // tslint:disable-next-line: max-line-length
  constructor(private cdr: ChangeDetectorRef, private _store: Store<IAppStore>, private _router: Router, private signalRService: SignalRService) { }

  ngOnInit() {
    this.raceEvent = 1;
    this.signalRService.signalRecieved.subscribe(( m: string) => {
      if(m === 'start'){
      console.log('SignalR Event' + m);
      setInterval(() => {
        if (this.starCoulDown === 0) {
          this.onRaceEvent.emit(RaceEvent.startRace);
          this.raceEvent = RaceEvent.startRace;
        }
        const newVal = this.starCoulDown - 1;
        this.starCoulDown = newVal ;
        this.cdr.detectChanges();
      }, 1000);
    //  this.start();
      }
    });
  }

  finish() {
    this._store.dispatch(new UserMapDisconnectMapEventResponseCompleteAction());
  }

  startEvent(){
    this._store.dispatch(new UserMapStartEventAction());
  }

  start() {
    if (this.starCoulDown > 0) {
      setTimeout(() => {
        const newVal = this.starCoulDown - 1;
        this.starCoulDown = newVal ;
        this.start();
      }
        , 1000);
    }
    else {
      this.onRaceEvent.emit(RaceEvent.startRace);
      this.raceEvent = RaceEvent.startRace;
    }
  }
}
