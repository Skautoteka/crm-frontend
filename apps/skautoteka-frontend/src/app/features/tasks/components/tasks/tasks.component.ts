import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ContentComponent, ButtonComponent, ModalService } from '@skautoteka-frontend/ui';
import { TasksContentComponent } from '../tasks-content/tasks-content.component';
import { TasksCreateComponent } from '../tasks-create/tasks-create.component';
import { TasksService } from '../../services';

@Component({
  standalone: true,
  selector: 'skt-tasks',
  styleUrl: './tasks.component.scss',
  templateUrl: 'tasks.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContentComponent, TasksContentComponent, ButtonComponent]
})
export class TasksComponent {
  constructor(classBinder: ClassBinder, private _modal: ModalService, private _tasks: TasksService) {
    classBinder.bind('skt-tasks');
    this._tasks.setActiveTask(null);
  }

  public onAddNewClick(): void {
    this._modal.createModal(TasksCreateComponent, {
      header: 'Dodaj zadanie',
      subHeader: 'Wypełnij wszystkie wymagane informacje o zadaniu i zapisz zmiany'
    });
  }
}
