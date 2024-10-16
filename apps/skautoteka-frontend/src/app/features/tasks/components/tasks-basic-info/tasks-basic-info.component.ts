import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { LabelComponent, LabelContainerComponent } from '@skautoteka-frontend/ui';
import { TasksStore } from '../../store/tasks.store';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skt-tasks-basic-info',
  styleUrl: './tasks-basic-info.component.scss',
  templateUrl: 'tasks-basic-info.component.html',
  providers: [ClassBinder],
  imports: [LabelComponent, LabelContainerComponent, DatePipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksBasicInfoComponent {
  public tasksStore = inject(TasksStore);
  public activeTask = this.tasksStore.activeTask;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks-basic-info');
  }
}
