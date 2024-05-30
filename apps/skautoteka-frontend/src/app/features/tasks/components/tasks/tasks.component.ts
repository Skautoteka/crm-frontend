import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  SideContentHeaderComponent,
  SideContentComponent,
  SidenavMenuComponent,
  SideContentheaderActionsComponent,
  ButtonComponent,
  ActionsConfig
} from '@skautoteka-frontend/ui';
import { TasksContentComponent } from '../tasks-content/tasks-content.component';
import { TasksSideContentComponent } from '../tasks-side-content/tasks-side-content.component';

@Component({
  standalone: true,
  selector: 'skt-tasks',
  styleUrl: './tasks.component.scss',
  templateUrl: 'tasks.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SidenavMenuComponent,
    TasksContentComponent,
    TasksSideContentComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent,
    SideContentComponent,
    ButtonComponent,
  ],
})
export class TasksComponent {
  public actionsConfig: ActionsConfig[] = [{ type: 'DELETE', text: 'Usuń raport' }]

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks');
  }
}
