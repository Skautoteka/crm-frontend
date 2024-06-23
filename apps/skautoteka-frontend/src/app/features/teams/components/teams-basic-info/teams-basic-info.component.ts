import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { LabelComponent, LabelContainerComponent } from '@skautoteka-frontend/ui';
import { TeamsService } from '../../services/teams.service';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skt-teams-basic-info',
  styleUrl: './teams-basic-info.component.scss',
  templateUrl: 'teams-basic-info.component.html',
  providers: [ClassBinder],
  imports: [LabelComponent, LabelContainerComponent, AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsBasicInfoComponent {
  constructor(classBinder: ClassBinder, private _teams: TeamsService) {
    classBinder.bind('skt-teams-basic-info');
  }

  get city$(): Observable<string> {
    return this._teams.activeTeam$.pipe(map(team => team?.city || ''));
  }

  get country$(): Observable<string> {
    return this._teams.activeTeam$.pipe(map(team => team?.country || ''));
  }
}
