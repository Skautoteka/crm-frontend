import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-tasks-teams',
  styleUrl: './tasks-teams.component.scss',
  templateUrl: 'tasks-teams.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksTeamsComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks-teams');
  }
}
