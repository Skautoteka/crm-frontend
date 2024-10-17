import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusText',
  standalone: true
})
export class StatusTextPipe implements PipeTransform {
  transform(status: string | null): string {
    switch (status) {
      case 'COMPLETED':
        return 'Ukończony';
      case 'IN_PROGRESS':
        return 'W trakcie';
      default:
        throw new Error(`Could not map a status: ${status}`);
    }
  }
}
