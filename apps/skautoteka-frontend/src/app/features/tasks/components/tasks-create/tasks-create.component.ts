import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ButtonComponent,
  InputComponent,
  InputContainerComponent,
  InputViewService,
} from '@skautoteka-frontend/ui';
import { AsyncPipe } from '@angular/common';
import { TasksStore } from '../../store/tasks.store';
import { Task } from '../../interfaces';

@Component({
  standalone: true,
  selector: 'skt-tasks-create',
  styleUrl: './tasks-create.component.scss',
  templateUrl: 'tasks-create.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [InputComponent, ButtonComponent, InputContainerComponent, AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksCreateComponent {
  public tasksStore = inject(TasksStore);

  constructor(
    classBinder: ClassBinder,
    public inputView: InputViewService<Task>,
  ) {
    classBinder.bind('skt-tasks-create');
    this.tasksStore.fetchFields();
  }

  public onSaveButtonClick(): void {
    this.tasksStore.addTask(this.inputView.value);
  }
}
