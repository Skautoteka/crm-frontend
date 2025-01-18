import { inject, Pipe, PipeTransform } from '@angular/core';
import { TableComponent } from '../components';
import { map, Observable, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  private _table = inject(TableComponent);
  private _search$ = toObservable(this._table.search);

  transform(items: Observable<{ searchQuery: string }[]>): Observable<any> {
    return items.pipe(
      switchMap(items => this._search$.pipe(map(query => ({ query, items })))),
      map(({ items, query }) => {
        if (!query.length) {
          return items;
        }

        return items.filter(item => {
          if (!item.searchQuery) {
            return true;
          }

          return item.searchQuery?.toLowerCase().includes(query.toLowerCase());
        });
      })
    );
  }
}
