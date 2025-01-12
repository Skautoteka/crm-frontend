import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ButtonComponent, IconComponent, InputViewService, SimpleButtonComponent } from '@skautoteka-frontend/ui';
import { AnalysisStore } from '../../store/analysis.store';
import { ReportCreateComponent } from '../analysis-report-create/analysis-report-create.component';
import { NoteCreateComponent } from '../analysis-note-create/analysis-note-create.component';

@Component({
  selector: 'skt-analysis-create',
  templateUrl: 'analysis-create.component.html',
  styleUrl: 'analysis-create.component.scss',
  standalone: true,
  imports: [ButtonComponent, SimpleButtonComponent, IconComponent, ReportCreateComponent, NoteCreateComponent],
  providers: [ClassBinder, InputViewService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AnalysisCreateComponent {
  public analysis = inject(AnalysisStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-analysis-create');
  }

  public onBoxClick(type: 'note' | 'report'): void {
    this.analysis.setType(type);
  }

  public onNextStepClick(): void {
    if (!this.analysis.type()) {
      return;
    }

    if (this.analysis.step() === 1) {
      if (this.analysis.type() === 'report') {
        this.analysis.sendReportAnalysis();
      } else {
        this.analysis.sendNoteAnalysis();
      }

      return;
    }

    this.analysis.setStep(this.analysis.step() + 1);
  }

  public onPreviosStepClick(): void {
    this.analysis.setStep(this.analysis.step() - 1);
  }
}
