import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AnalysisStore } from '../../store/analysis.store';
import { PredicateFilterComponent } from '../predicate-filter/predicate-filter.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputSearchComponent } from '@skautoteka-frontend/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'skt-analysis-report-create',
  templateUrl: 'analysis-report-create.component.html',
  styleUrl: 'analysis-report-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [PredicateFilterComponent, ReactiveFormsModule, InputSearchComponent]
})
export class ReportCreateComponent {
  public analysis = inject(AnalysisStore);

  public playerControl = new FormControl('');
  public regionControl = new FormControl('');

  private _classBinder = inject(ClassBinder);

  constructor() {
    this._classBinder.bind('skt-analysis-report-create');
    this.analysis.getReportFilters();

    this.playerControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      console.log(value);
      this.analysis.setReportPlayerId(value);
    });

    this.regionControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => this.analysis.setReportRegionId(value));
  }
}
