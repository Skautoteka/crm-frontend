import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IconComponent } from '../../../../../../../../libs/ui/src/lib/icon';

@Component({
  standalone: true,
  selector: 'skt-reports-side-empty',
  styleUrl: 'reports-side-empty.component.scss',
  templateUrl: 'reports-side-empty.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class ReportsSideEmptyComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-side-empty');
  }
}
