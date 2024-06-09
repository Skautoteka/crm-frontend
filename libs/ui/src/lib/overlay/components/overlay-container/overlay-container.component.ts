import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-ui-overlay-container',
  styleUrl: './overlay-container.component.scss',
  templateUrl: 'overlay-container.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayContainerComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-overlay-container');
  }
}
