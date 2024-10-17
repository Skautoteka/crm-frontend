import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skt-ui-label',
  styleUrl: './label.component.scss',
  templateUrl: 'label.component.html',
  imports: [CommonModule],
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent {
  @Input() valueClass = '';

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-label');
  }
}
