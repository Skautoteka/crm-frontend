import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TabComponent, TabsComponent } from '@skautoteka-frontend/ui';
import { AnalysisCreateComponent } from '../analysis-create/analysis-create.component';

@Component({
  standalone: true,
  selector: 'skt-analysis-content',
  styleUrl: 'analysis-content.component.scss',
  templateUrl: 'analysis-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TabsComponent, TabComponent, AnalysisCreateComponent]
})
export class AnalysisContentComponent {
  public activeTab = signal<string | null>(null);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-analysis-content');
  }

  public onTabChange(tab: string | null): void {
    this.activeTab.set(tab);
  }
}
