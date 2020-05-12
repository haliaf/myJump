
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppStore } from 'src/app/infrastruct/store/store-root.module';
import { ObjectHelper } from '../../../infrastruct/CustomObjectHelper';
import { ChangeStoreRequest } from '../../common/ChangeStoreRequest';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { IViewInputBlockParam } from './ViewInputBlockParam';

/**
 * call this.onDestroy() in ngObDestroy in child
 * call this.initStore() in ngOnInit in child
 */
export abstract class ViewInputBlock<TModel> extends BaseDestroyComponent {

  // TODO: replace later on InputBlockParam
 // abstract opt: IViewInputBlockParam;

  // tslint:disable-next-line: variable-name
  protected _ngrx: Store<IAppStore>;
  public store$: Observable<TModel>;
  protected _storeName: string;
  protected _changeAction: string;

  protected constructor(ngrx: Store<IAppStore>) {
    super();
    this._ngrx = ngrx;
  }


  protected initStore(storeName): void {
    this._storeName = storeName;
    this.store$ = this._ngrx.select(storeName);
  }

  protected initStoreForAutoChange(storeName, nameChangeAction): void {
    this._storeName = storeName;
    this._changeAction = nameChangeAction;
    this.store$ = this._ngrx.select(storeName);
  }

  propOnChange($event, propName): void {
    const self = this;
    self._ngrx.dispatch({
      type: this._changeAction,
      payload: {
        blockPath: this._storeName,
        propPath: propName,
        value: $event
      } as ChangeStoreRequest
    });
  }

  propChangeHandler(e){
    const updatedField = e.dataField.toLowerCase();
    const newValue = e.value;
    this.propOnChange(newValue, updatedField);
  }

  protected _extractOid(src: any, propName: string): string {
    return ObjectHelper.extractOid(src, propName);
  }
}


export abstract class ViewBlock extends BaseDestroyComponent {

  // TODO: replace later on InputBlockParam
  abstract opt: IViewInputBlockParam;

  // tslint:disable-next-line: variable-name
  protected _redux: Store<IAppStore>;

  protected constructor(redux: Store<IAppStore>) {
    super();
    this._redux = redux;
  }

  /**init store$ observable by some store item */
  protected initStore(): void {
  }

  propOnChange($event, propName): void {
    const self = this;
    self._redux.dispatch({
      type: self.opt.changeActionType,
      payload: {
        blockPath: self.opt.storePath,
        propPath: propName,
        value: $event
      } as ChangeStoreRequest
    });
  }

  protected _extractOid(src: any, propName: string): string {
    return ObjectHelper.extractOid(src, propName);
  }
}
