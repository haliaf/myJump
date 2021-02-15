import { IMapEvent } from './../../../infrastruct/store/common/IMapEvent';
import { ICoordinateDto } from './../../../infrastruct/store/common/ICoordinate';
import { Component, OnInit, Input } from '@angular/core';

import { IAppStore } from 'src/app/infrastruct/store/store-root.module';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-race-map',
  templateUrl: './race.map.component.html',
  styleUrls: ['./race.map.component.scss']
})

export class RaceMapComponent implements OnInit {
  @Input()
  resizedImage: string;
  @Input()
  raceEventId: number;
  @Input()
  goToStart: boolean;
  @Input()
  selected: boolean;
  rEvent: number;//Для отслеживания события
  store$ = this._store.select(s => s.securityUserAccountStore);
  mapEvent: IMapEvent[];
  constructor(private _store: Store<IAppStore>) { }

  ngOnInit() {
    this.rEvent = 1;
    this._store.select(s => s.userMapStore).subscribe(m => {
      this.mapEvent = m.activeMapEvents.filter( m => m.id === this.raceEventId);
    });
  }
  raceEvent(e){
    this.rEvent = e;
  }

}
