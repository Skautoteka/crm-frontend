import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { LabelComponent, LabelContainerComponent } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  selector: 'skt-teams-basic-info',
  styleUrl: './teams-basic-info.component.scss',
  templateUrl: 'teams-basic-info.component.html',
  providers: [ClassBinder],
  imports: [LabelComponent, LabelContainerComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsBasicInfoComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-teams-basic-info');
  }
}
