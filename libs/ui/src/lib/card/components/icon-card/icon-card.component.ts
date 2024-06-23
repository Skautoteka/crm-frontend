import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IconComponent } from '../../../icon';

@Component({
  standalone: true,
  selector: 'skt-ui-icon-card',
  styleUrl: './icon-card.component.scss',
  templateUrl: './icon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconComponent],
  providers: [ClassBinder]
})
export class IconCardComponent {
  public iconName = input<string>('');

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-icon-card');
  }
}
