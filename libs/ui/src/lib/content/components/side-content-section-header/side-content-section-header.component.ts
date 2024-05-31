import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-ui-side-content-section-header',
  styleUrl: './side-content-section-header.component.scss',
  templateUrl: 'side-content-section-header.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideContentSectionHeaderComponent {
  public title = input<string>('');

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-side-content-section-header');
  }
}
