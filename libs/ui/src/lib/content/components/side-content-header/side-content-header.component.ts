import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  selector: 'skt-ui-side-content-header',
  templateUrl: './side-content-header.component.html',
  styleUrl: './side-content-header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class SideContentHeaderComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-side-content-header');
  }
}
