import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TabComponent, TabsComponent } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  selector: 'skt-analysis-content',
  styleUrl: 'analysis-content.component.scss',
  templateUrl: 'analysis-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TabsComponent, TabComponent]
})
export class AnalysisContentComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-analysis-content');
  }
}
