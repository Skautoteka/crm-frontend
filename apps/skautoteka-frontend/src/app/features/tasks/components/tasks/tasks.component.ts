import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ContentComponent, ButtonComponent, ModalService } from '@skautoteka-frontend/ui';
import { TasksContentComponent } from '../tasks-content/tasks-content.component';
import { TasksCreateComponent } from '../tasks-create/tasks-create.component';
import { TasksStore } from '../../store/tasks.store';

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
  public tasks = inject(TasksStore);

  constructor(classBinder: ClassBinder, private _modal: ModalService) {
    classBinder.bind('skt-tasks');
  }

  public onAddNewClick(): void {
    this._modal.createModal(TasksCreateComponent, {
      header: 'Dodaj zadanie',
      subHeader: 'Wypełnij wszystkie wymagane informacje o zadaniu i zapisz zmiany'
    });
  }
}
