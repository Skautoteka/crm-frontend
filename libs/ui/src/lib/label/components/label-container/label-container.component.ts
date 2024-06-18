import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-ui-label-container',
  styleUrl: './label-container.component.scss',
  templateUrl: 'label-container.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelContainerComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-label-container');
  }
}
