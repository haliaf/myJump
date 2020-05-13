import { Component, OnInit } from '@angular/core';
import { IUserMapModel } from 'src/app/infrastruct/store/user-map/user-map.model';
import { ViewInputBlock } from 'src/app/shared/components/_default/ViewInputBlock';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/infrastruct/store/store-root.module';
import { UserMapLoadAction } from 'src/app/infrastruct/store/user-map/user-map.actions';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent extends ViewInputBlock<IUserMapModel> implements OnInit  {
  constructor(private _store: Store<IAppStore>) {
    super(_store);
  }
  store$ = this._store.select(s => s.userMapStore);

  ngOnInit() {
    this.initStoreForAutoChange('userMapStore',  'USER_MAP_CHANGE');
    this._store.dispatch(new UserMapLoadAction());
  }
  checkbool(a,b){
    return a === b;
  }
  onCreateSpeedRun(e){
    let titleTab =  e.addedItems[0].title;
    this.propOnChange(titleTab, 'istabselected');
  }
}

