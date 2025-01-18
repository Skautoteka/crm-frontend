import { inject, Pipe, PipeTransform } from '@angular/core';
import { TableComponent } from '../components';
import { map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Pipe({
  name: 'infinite',
  standalone: true
})
export class InfinitePipe<T> implements PipeTransform {
  private _table = inject(TableComponent);
  private _ref = 0;

  private _search$ = toObservable(this._table.search);

  transform(items: T[]): Observable<T[] | null> {
    return of(items).pipe(
      switchMap(() => this._table.scrolledDown$),
      tap(scrolled => {
        if (scrolled && items.length > this._ref * 10) {
          this._ref++;
        }
      }),
      switchMap(() => this._search$.pipe(startWith(''))),
      map(() => {
        if (this._table.search().length !== 0) {
          return items;
        }

        return items.slice(0, this._ref * 10);
      })
    );
  }
}
