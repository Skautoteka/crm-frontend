import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AnalysisStore } from '../../store/analysis.store';
import { ButtonComponent, SimpleButtonComponent } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  selector: 'skt-analysis-result',
  templateUrl: 'analysis-result.component.html',
  styleUrl: 'analysis-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [ButtonComponent, SimpleButtonComponent]
})
export class AnalysisResultComponent {
  public analysis = inject(AnalysisStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-analysis-result');
  }

  public onNewCreateClick(): void {
    this.analysis.clearAnalysis();
  }
}
