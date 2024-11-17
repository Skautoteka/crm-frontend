import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IconComponent } from '../../../icon';

@Component({
  standalone: true,
  selector: 'skt-ui-side-content-section-header-action',
  styleUrl: './side-content-section-header-action.component.scss',
  templateUrl: 'side-content-section-header-action.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent]
})
export class SideContentSectionHeaderActionComponent {
  public title = input<string>('');
  public icon = input<string>('');
  public iconColor = input<string>('');

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-side-content-section-header-action');
  }
}
