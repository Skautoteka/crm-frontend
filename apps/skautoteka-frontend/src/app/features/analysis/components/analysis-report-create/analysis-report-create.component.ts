import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AnalysisStore } from '../../store/analysis.store';

@Component({
  standalone: true,
  selector: 'skt-analysis-report-create',
  templateUrl: 'analysis-report-create.component.html',
  styleUrl: 'analysis-report-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder]
})
export class ReportCreateComponent {
  public analysis = inject(AnalysisStore);

  private _classBinder = inject(ClassBinder);

  constructor() {
    this._classBinder.bind('skt-analysis-report-create');
    this.analysis.getFilters();
  }
}
