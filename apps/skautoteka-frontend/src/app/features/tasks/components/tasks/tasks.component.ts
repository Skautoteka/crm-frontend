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
} from '@skautoteka-frontend/ui';
import { TasksContentComponent } from '../tasks-content/tasks-content.component';
import { TasksSideContentComponent } from '../tasks-side-content/tasks-side-content.component';
import { ButtonComponent } from '../../../../../../../../libs/ui/src/lib/button';

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
    SideContentComponent,
    ButtonComponent,
  ],
})
export class TasksComponent {
public title = 'Dupa'

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks');

    setTimeout(() => {
      this.title = 'Uuuu'
    }, 500)
  }
}
