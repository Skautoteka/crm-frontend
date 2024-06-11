import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ContentComponent,
  ButtonComponent,
  ModalService,
} from '@skautoteka-frontend/ui';
import { TasksContentComponent } from '../tasks-content/tasks-content.component';
import { TasksService } from '../../services/tasks.service';

@Component({
  standalone: true,
  selector: 'skt-tasks',
  styleUrl: './tasks.component.scss',
  templateUrl: 'tasks.component.html',
  providers: [ClassBinder, TasksService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContentComponent, TasksContentComponent, ButtonComponent],
})
export class TasksComponent {
  constructor(classBinder: ClassBinder, private _modal: ModalService) {
    classBinder.bind('skt-tasks');
  }

  public onAddNewClick(): void {
    this._modal.createModal(ButtonComponent);
  }
}
