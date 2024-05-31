import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-ui-label',
  styleUrl: './label.component.scss',
  templateUrl: 'label.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  public label = input<string>('');

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-tab');
  }
}
