import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-ui-modal',
  styleUrl: './modal.component.scss',
  templateUrl: 'modal.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-modal');
  }
}
