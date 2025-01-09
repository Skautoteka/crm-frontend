import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AnalysisStore } from '../../store/analysis.store';
import { PredicateFilterComponent } from '../predicate-filter/predicate-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'skt-analysis-report-create',
  templateUrl: 'analysis-report-create.component.html',
  styleUrl: 'analysis-report-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [PredicateFilterComponent, ReactiveFormsModule]
})
export class ReportCreateComponent {
  public analysis = inject(AnalysisStore);

  private _classBinder = inject(ClassBinder);

  constructor() {
    this._classBinder.bind('skt-analysis-report-create');
    this.analysis.getReportFilters();
  }
}
