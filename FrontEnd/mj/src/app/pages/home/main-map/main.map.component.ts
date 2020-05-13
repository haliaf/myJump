import { Component, OnInit, Input } from '@angular/core';

import { IAppStore } from 'src/app/infrastruct/store/store-root.module';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main-map',
  templateUrl: './main.map.component.html',
  styleUrls: ['./main.map.component.scss']
})



export class MainMapComponent implements OnInit {
  @Input()
  resizedImage: string;
  @Input()
  tabSelected: boolean;
  store$ = this._store.select(s => s.securityUserAccountStore);
  constructor(private _store: Store<IAppStore>) { }

  ngOnInit() {

  }

}
