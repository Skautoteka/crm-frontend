import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  selector: 'skt-ui-side-content-section',
  templateUrl: './side-content-section.component.html',
  styleUrl: './side-content-section.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder]
})
export class SideContentSectionComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-side-content-section');
  }
}
