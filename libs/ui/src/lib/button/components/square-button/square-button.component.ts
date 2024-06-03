import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IconComponent } from '../../../icon';

@Component({
  standalone: true,
  selector: 'skt-ui-square-button',
  templateUrl: './square-button.component.html',
  styleUrl: './square-button.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
  imports: [IconComponent],
})
export class SquareButtonComponent {
  @Input({ required: true }) iconName!: string;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-square-button');
  }
}
