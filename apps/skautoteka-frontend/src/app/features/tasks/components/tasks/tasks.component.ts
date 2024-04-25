import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TasksHeaderComponent } from '../tasks-header/tasks-header.component';

@Component({
  standalone: true,
  selector: 'skt-tasks',
  styleUrl: './tasks.component.scss',
  templateUrl: 'tasks.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TasksHeaderComponent],
})
export class TasksComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks');
  }
}
