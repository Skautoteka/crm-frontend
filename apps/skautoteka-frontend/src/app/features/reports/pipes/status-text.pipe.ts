import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusText',
  standalone: true
})
export class StatusTextPipe implements PipeTransform {
  transform(status: string | null): string {
    switch (status) {
      case 'finished':
        return 'Ukończony';
      case 'in_progress':
        return 'W trakcie';
      default:
        throw new Error(`Could not map a status: ${status}`);
    }
  }
}
