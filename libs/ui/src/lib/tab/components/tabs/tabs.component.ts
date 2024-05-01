import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-ui-tabs',
  styleUrl: './tabs.component.scss',
  templateUrl: 'tabs.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-tabs');
  }
}
