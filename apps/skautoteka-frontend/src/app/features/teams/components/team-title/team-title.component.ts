import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe } from '@angular/common';
import { TeamsStore } from '../../store/teams.store';

@Component({
  standalone: true,
  selector: 'skt-team-title',
  styleUrl: './team-title.component.scss',
  templateUrl: 'team-title.component.html',
  providers: [ClassBinder],
  imports: [AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamTitleComponent {
  public teamsStore = inject(TeamsStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-team-title');
  }
}
