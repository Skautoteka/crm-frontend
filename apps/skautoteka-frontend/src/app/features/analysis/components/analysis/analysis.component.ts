import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IconComponent } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  selector: 'skt-analysis',
  styleUrl: './analysis.component.scss',
  templateUrl: 'analysis.component.html',
  providers: [ClassBinder],
  imports: [IconComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalysisComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-analysis');
  }
}
