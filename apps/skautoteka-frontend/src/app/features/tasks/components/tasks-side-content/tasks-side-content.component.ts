import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-tasks-side-content',
  styleUrl: './tasks-side-content.component.scss',
  templateUrl: 'tasks-side-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksSideContentComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks-side-content');
  }
}
