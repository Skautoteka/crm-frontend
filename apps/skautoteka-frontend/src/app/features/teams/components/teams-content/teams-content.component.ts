import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { TableComponent, TableRowCellComponent, TableRowComponent } from '@skautoteka-frontend/ui';
import { TeamsService } from '../../services/teams.service';

@Component({
  standalone: true,
  selector: 'skt-teams-content',
  styleUrl: './teams-content.component.scss',
  templateUrl: 'teams-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableComponent, TableRowComponent, TableRowCellComponent]
})
export class TeamsContentComponent {
  public tableDef = [
    { name: 'Zdjecie', width: '15%', hidden: true },
    { name: 'Nazwa', width: '35%' },
    { name: 'Kraj', width: '20%' },
    { name: 'Miasto', width: '30%' }
  ]

  constructor(classBinder: ClassBinder, private _teamsService: TeamsService) {
    classBinder.bind('skt-teams-content');

    this._teamsService.fetchAllTeams();
  }
}
