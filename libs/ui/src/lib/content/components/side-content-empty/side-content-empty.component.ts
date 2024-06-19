import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IconComponent } from '../../../icon/components';

@Component({
  standalone: true,
  selector: 'skt-ui-side-content-empty',
  styleUrl: 'side-content-empty.component.scss',
  templateUrl: 'side-content-empty.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent]
})
export class SideContentEmptyComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-side-content-empty');
  }
}
