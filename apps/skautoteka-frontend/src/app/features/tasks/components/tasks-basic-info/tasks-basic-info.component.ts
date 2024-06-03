import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { LabelComponent, LabelContainerComponent } from '@skautoteka-frontend/ui';


@Component({
  standalone: true,
  selector: 'skt-tasks-basic-info',
  styleUrl: './tasks-basic-info.component.scss',
  templateUrl: 'tasks-basic-info.component.html',
  providers: [ClassBinder],
  imports: [LabelComponent, LabelContainerComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksBasicInfoComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks-basic-info');
  }
}
