import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces';

@Pipe({ standalone: true, name: 'taskType' })
export class TaskTypePipe implements PipeTransform {
  transform(tasks: Task[], type: string | null) {
    if (type === 'finished') {
      return tasks.filter(t => t.status === 'COMPLETED');
    }

    if (type === 'unassigned') {
      return tasks.filter(t => t.assignedToId === null);
    }

    if (type === 'assigned') {
      return tasks.filter(t => t.assignedToId !== null);
    }

    return [];
  }
}
