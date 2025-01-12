import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AnalysisStore } from '../../store/analysis.store';
import { ButtonComponent, ModalService, SimpleButtonComponent } from '@skautoteka-frontend/ui';
import { AnalysisValuesModalComponent } from '../analysis-values-modal/analysis-values-modal.component';
import { AnalysisResult } from '../../interfaces/analysis';

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
  public modal = inject(ModalService);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-analysis-result');
  }

  public onNewCreateClick(): void {
    this.analysis.clearAnalysis();
  }

  public onValuesButtonClick(entry: AnalysisResult): void {
    this.modal.createModal(AnalysisValuesModalComponent, {
      header: 'Oceny z analizy',
      subHeader: 'Przeglądaj oceny rekordu',
      data: entry
    });
  }
}
