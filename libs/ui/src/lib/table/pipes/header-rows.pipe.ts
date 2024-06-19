import { Pipe, PipeTransform } from '@angular/core';
import { TableSource } from '../interfaces/itable';

@Pipe({
  name: 'headerRows',
  standalone: true
})
export class HeaderRowsPipe implements PipeTransform {
  transform(source: TableSource<unknown>): string[] {
    return this._getColumns(source);
  }

  private _getColumns(source: TableSource<unknown>): string[] {
    return source.reduce((prev, curr) => [], []);
  }
}
