import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-ui-tab',
  styleUrl: './tab.component.scss',
  templateUrl: 'tab.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-tab');
  }
}
