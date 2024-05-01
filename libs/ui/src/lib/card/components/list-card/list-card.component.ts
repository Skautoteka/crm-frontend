import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IconComponent } from '../../../icon';

@Component({
  standalone: true,
  selector: 'skt-ui-list-card',
  styleUrl: './list-card.component.scss',
  templateUrl: './list-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [IconComponent],
})
export class ListCardComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-list-card');
  }
}
