import { inject, Pipe, PipeTransform } from '@angular/core';
import { TableComponent } from '../components';
import { map, Observable, of, switchMap } from 'rxjs';

@Pipe({
  name: 'infinite',
  standalone: true
})
export class InfinitePipe<T> implements PipeTransform {
  private _table = inject(TableComponent);
  private _ref = 0;

  transform(items: T[]): Observable<T[] | null> {
    return of(items).pipe(
      switchMap(() => this._table.scrolledDown$),
      map(scrolled => {
        if (scrolled && items.length > this._ref * 10) {
          this._ref++;
        }

        return items.slice(0, this._ref * 10);
      })
    );
  }
}
