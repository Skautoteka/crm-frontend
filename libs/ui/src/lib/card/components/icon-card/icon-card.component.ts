import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-ui-list-card',
  styleUrl: './list-card.component.scss',
  templateUrl: './list-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder]
})
export class IconCardComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-icon-card');
  }
}
