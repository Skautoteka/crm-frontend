import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IconComponent } from '../../../icon';

@Component({
  standalone: true,
  selector: 'skt-ui-simple-button',
  templateUrl: './simple-button.component.html',
  styleUrl: './simple-button.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
  imports: [IconComponent]
})
export class SimpleButtonComponent {
  public iconName = input<string>('');

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-simple-button');
  }
}
