import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IconComponent } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  selector: 'skt-tasks-side-empty',
  styleUrl: 'tasks-side-empty.component.scss',
  templateUrl: 'tasks-side-empty.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class TasksSideEmptyComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-side-empty');
  }
}
