import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { LabelComponent, LabelContainerComponent } from '@skautoteka-frontend/ui';
import { TeamsStore } from '../../store/teams.store';

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
  public teamsStore = inject(TeamsStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-teams-basic-info');
  }
}
