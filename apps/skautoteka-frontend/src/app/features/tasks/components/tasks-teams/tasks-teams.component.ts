import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TasksStore } from '../../store/tasks.store';

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
  public taskStore = inject(TasksStore);
  public activeTask = this.taskStore.activeTask;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks-teams');
  }
}
