import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  InfinitePipe,
  LoaderComponent,
  SearchPipe,
  TableComponent,
  TableRowCellComponent,
  TableRowComponent
} from '@skautoteka-frontend/ui';
import { TeamsStore } from '../../store/teams.store';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skt-teams-content',
  styleUrl: './teams-content.component.scss',
  templateUrl: 'teams-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableComponent,
    SearchPipe,
    TableRowComponent,
    TableRowCellComponent,
    InfinitePipe,
    AsyncPipe,
    NgFor,
    LoaderComponent
  ]
})
export class TeamsContentComponent {
  public teamsStore = inject(TeamsStore);

  public tableDef = [
    { name: 'Zdjecie', width: '4rem', hidden: true },
    { name: 'Nazwa', width: 'auto' },
    { name: 'Miasto', width: '30%' },
    { name: 'Kraj', width: '25%' }
  ];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-teams-content');
    this.teamsStore.getTeams();
  }

  public onRowClicked(id: string): void {
    this.teamsStore.setActiveTeam(id);
  }
}
