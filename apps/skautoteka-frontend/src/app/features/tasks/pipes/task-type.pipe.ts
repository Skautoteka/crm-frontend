import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces';
import { DaysLeftPipe } from './days-left.pipe';

@Pipe({ standalone: true, name: 'taskType' })
export class TaskTypePipe implements PipeTransform {
  transform(tasks: Task[], type: string | null) {
    if (type === 'finished') {
      return tasks.filter(t => t.status.toUpperCase() === 'COMPLETED');
    }

    if (type === 'unassigned') {
      return tasks.filter(t => t.assignedToId === null);
    }

    if (type === 'assigned') {
      return tasks.filter(t => t.assignedToId !== null);
    }

    if (type === 'past') {
      const pipe = new DaysLeftPipe();

      return tasks.filter(task => pipe.transform(task.startDate) === 'Termin minął');
    }

    return [];
  }
}
