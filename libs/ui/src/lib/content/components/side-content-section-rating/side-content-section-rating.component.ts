import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  selector: 'skt-ui-side-content-section-rating',
  templateUrl: './side-content-section-rating.component.html',
  styleUrl: './side-content-section-rating.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder]
})
export class SideContentSectionRatingComponent {
  @Input() data: any[] = [];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-side-content-section-rating');
  }
}
