import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ButtonComponent, InputContainerComponent, InputViewService } from '@skautoteka-frontend/ui';
import { TasksStore } from '../../store/tasks.store';
import { Task } from '../../interfaces';
import { NotificationsService } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  selector: 'skt-tasks-create',
  styleUrl: './tasks-create.component.scss',
  templateUrl: 'tasks-create.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [ButtonComponent, InputContainerComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksCreateComponent {
  public tasksStore = inject(TasksStore);
  public notification = inject(NotificationsService);

  constructor(classBinder: ClassBinder, public inputView: InputViewService<Task>) {
    classBinder.bind('skt-tasks-create');
    this.tasksStore.fetchFields();
  }

  public onSaveButtonClick(): void {
    if (this.inputView.isValid) {
      this.tasksStore.addTask(this.inputView.value);
    } else {
      this.notification.error('Wypełnij poprawnie formularz');
    }
  }
}
