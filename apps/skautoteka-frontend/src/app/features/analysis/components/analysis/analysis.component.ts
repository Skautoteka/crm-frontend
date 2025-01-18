import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ContentComponent } from '@skautoteka-frontend/ui';
import { AnalysisContentComponent } from '../analysis-content/analysis-content.component';

@Component({
  standalone: true,
  selector: 'skt-analysis',
  styleUrl: './analysis.component.scss',
  templateUrl: 'analysis.component.html',
  providers: [ClassBinder],
  imports: [ContentComponent, AnalysisContentComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalysisComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-analysis');
  }
}
