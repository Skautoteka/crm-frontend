import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AnalysisCreateComponent } from '../analysis-create/analysis-create.component';
import { AnalysisStore } from '../../store/analysis.store';
import { AnalysisResultComponent } from '../analysis-result/analysis-result.component';

@Component({
  standalone: true,
  selector: 'skt-analysis-content',
  styleUrl: 'analysis-content.component.scss',
  templateUrl: 'analysis-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnalysisCreateComponent, AnalysisResultComponent]
})
export class AnalysisContentComponent {
  public activeTab = signal<string | null>(null);
  public analysis = inject(AnalysisStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-analysis-content');
  }

  public onTabChange(tab: string | null): void {
    this.activeTab.set(tab);
  }
}
