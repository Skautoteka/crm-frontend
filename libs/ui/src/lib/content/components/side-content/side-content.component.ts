import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  selector: 'skt-ui-side-content',
  templateUrl: './side-content.component.html',
  styleUrl: './side-content.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class SideContentComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-side-content');
  }
}
