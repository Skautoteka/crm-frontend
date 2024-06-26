import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe } from '@angular/common';
import { ReportsService } from '../../services';
import { IconCardComponent } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  selector: 'skt-report-rating',
  styleUrl: './reports-rating.component.scss',
  templateUrl: 'reports-rating.component.html',
  providers: [ClassBinder],
  imports: [AsyncPipe, IconCardComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsRatingComponent {
  constructor(classBinder: ClassBinder, private _report: ReportsService) {
    classBinder.bind('skt-reports-rating');
  }
}
