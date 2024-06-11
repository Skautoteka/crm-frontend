import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ButtonComponent,
  InputComponent,
  InputConfig,
  InputContainerComponent,
} from '@skautoteka-frontend/ui';
import { TasksService } from '../../services';

@Component({
  standalone: true,
  selector: 'skt-tasks-create',
  styleUrl: './tasks-create.component.scss',
  templateUrl: 'tasks-create.component.html',
  providers: [ClassBinder],
  imports: [InputComponent, ButtonComponent, InputContainerComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksCreateComponent {
  public inputConfig: InputConfig = [];

  constructor(classBinder: ClassBinder, private _tasks: TasksService) {
    classBinder.bind('skt-tasks-create');
    this._getFieldsConfig();
  }

  private _getFieldsConfig(): void {
    this._tasks.getCreateFieldsConfig$().subscribe((config) => {
      console.log(config);
      this.inputConfig = config;
    });
  }
}
