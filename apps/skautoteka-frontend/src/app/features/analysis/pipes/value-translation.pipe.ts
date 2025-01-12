import { inject, Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AnalysisHttpService } from '../services/analysis-http.service';

@Pipe({
  standalone: true,
  name: 'valueTranslate'
})
export class ValueTranslationPipe implements PipeTransform {
  public static labelCache: Map<string, string> | null = null;

  private _http = inject(AnalysisHttpService);

  transform(value: string): Observable<string> {
    return this._getLabel$(value);
  }

  private _getLabel$(value: string): Observable<string> {
    const cache = ValueTranslationPipe.labelCache;

    if (cache) {
      return of(cache.get(value) || value);
    }

    if (value === 'evaluation') {
      return of('Ogólna ocena');
    }

    return this._http.getLabels$().pipe(
      map(res => {
        const map = new Map();

        res.forEach(entry => {
          map.set(entry.key, entry.label);
        });

        ValueTranslationPipe.labelCache = map;

        return map.get(value) || value;
      })
    );
  }
}
