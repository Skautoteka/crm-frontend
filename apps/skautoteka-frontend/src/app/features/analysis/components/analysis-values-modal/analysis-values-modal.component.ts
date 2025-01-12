import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IconComponent, OVERLAY_DATA } from '@skautoteka-frontend/ui';
import { ValueTranslationPipe } from '../../pipes';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skt-analysis-values-modal',
  templateUrl: 'analysis-values-modal.component.html',
  styleUrl: 'analysis-values-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [IconComponent, ValueTranslationPipe, AsyncPipe]
})
export class AnalysisValuesModalComponent {
  public entry = inject(OVERLAY_DATA);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-analysis-values-modal');
  }
}
