import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { SidenavMenuComponent, ButtonComponent } from '@skautoteka-frontend/ui';
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
  imports: [SidenavMenuComponent, TasksContentComponent, ButtonComponent],
})
export class TasksComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks');
  }
}
