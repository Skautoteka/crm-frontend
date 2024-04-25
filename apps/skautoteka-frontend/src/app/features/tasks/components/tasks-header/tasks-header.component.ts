import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-tasks-header',
  styleUrl: './tasks-header.component.scss',
  templateUrl: 'tasks-header.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksHeaderComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks-header');
  }
}
