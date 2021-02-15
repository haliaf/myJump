import { OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction } from 'rxjs/internal/types';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

/** Use this base component class if you want to use takeUntilDestroy functionality */
export abstract class BaseDestroyComponent implements OnDestroy {

   private _destroy$ = new ReplaySubject<boolean>(1);

   protected takeUntilDestroyed<T>(): MonoTypeOperatorFunction<T> {
      return takeUntil(this._destroy$.asObservable());
   }

   ngOnDestroy(): void {
      // console.warn('was destroed!');
      this._destroy$.next(true);
      this._destroy$.complete();
   }
}
