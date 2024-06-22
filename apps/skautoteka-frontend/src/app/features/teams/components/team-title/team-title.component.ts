import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TeamsService } from '../../services/teams.service';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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
  constructor(classBinder: ClassBinder, private _team: TeamsService) {
    classBinder.bind('skt-team-title');
  }

  get teamName$(): Observable<string> {
    return this._team.activeTeam$.pipe(map(team => team?.name || ''))
  }
}
