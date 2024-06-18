import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  selector: 'skt-ui-side-content-section-entity',
  templateUrl: './side-content-section-entity.component.html',
  styleUrl: './side-content-section-entity.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class SideContentSectionEntityComponent {
  @Input() imgSrc = '';
  @Input() imgAlt = '';
  @Input() name = '';
  @Input() subname = '';

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-side-content-section-entity');
  }
}
