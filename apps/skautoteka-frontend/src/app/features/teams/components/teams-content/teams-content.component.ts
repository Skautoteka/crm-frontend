import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TableComponent, TableRowCellComponent, TableRowComponent } from '@skautoteka-frontend/ui';
import { TeamsService } from '../../services/teams.service';
import { AsyncPipe } from '@angular/common';
import { Team } from '../../interfaces/team';
import { Observable } from 'rxjs';
import { TableSource } from '@skautoteka-frontend/ui';

@Component({
  standalone: true,
  selector: 'skt-teams-content',
  styleUrl: './teams-content.component.scss',
  templateUrl: 'teams-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableComponent, TableRowComponent, TableRowCellComponent, AsyncPipe]
})
export class TeamsContentComponent {
  public tableDef = [
    { name: 'Zdjecie', width: '4rem', hidden: true },
    { name: 'Nazwa', width: 'auto' },
    { name: 'Kraj', width: '25%' },
    { name: 'Miasto', width: '30%' }
  ];

  get tableSource$(): Observable<TableSource<Team>> {
    return this._teams.allTeams$;
  }

  constructor(classBinder: ClassBinder, private _teams: TeamsService) {
    classBinder.bind('skt-teams-content');
    this._teams.fetchAllTeams();
  }

  public onRowClicked(id: string): void {
    this._teams.setActiveTeam(id);
  }
}
