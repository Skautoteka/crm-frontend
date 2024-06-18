import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ButtonComponent,
  InputComponent,
  InputConfig,
  InputContainerComponent,
  ModalService
} from '@skautoteka-frontend/ui';
import { TasksService } from '../../services';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skt-tasks-create',
  styleUrl: './tasks-create.component.scss',
  templateUrl: 'tasks-create.component.html',
  providers: [ClassBinder],
  imports: [InputComponent, ButtonComponent, InputContainerComponent, AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksCreateComponent {
  public config = signal<InputConfig | null>(null);

  constructor(classBinder: ClassBinder, private _tasks: TasksService, private _modal: ModalService) {
    classBinder.bind('skt-tasks-create');

    this._tasks.getCreateFieldsConfig$().subscribe(config => this.config.set(config));
  }

  public onSaveButtonClick(): void {
    this._tasks.addTask({
      id: Math.random() * 10000
    });

    this._modal.closeAll();
  }
}
