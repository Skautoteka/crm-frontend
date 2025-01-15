import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'daysLeft'
})
export class DaysLeftPipe implements PipeTransform {
  transform(isoDate: string) {
    const date = new Date(isoDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }

    const diffTime = date.getTime() - today.getTime();

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `Za ${diffDays} dni` : 'Termin minął';
  }
}
