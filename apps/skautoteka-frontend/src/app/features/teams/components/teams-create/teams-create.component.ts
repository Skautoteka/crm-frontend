import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ButtonComponent,
  InputComponent,
  InputContainerComponent,
  InputViewService,
  ModalService
} from '@skautoteka-frontend/ui';
import { AsyncPipe } from '@angular/common';
import { Team } from '../../interfaces/team';
import { TeamsStore } from '../../store/teams.store';

@Component({
  standalone: true,
  selector: 'skt-teams-create',
  styleUrl: './teams-create.component.scss',
  templateUrl: 'teams-create.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [InputComponent, ButtonComponent, InputContainerComponent, AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsCreateComponent {
  public teamsStore = inject(TeamsStore);

  constructor(classBinder: ClassBinder, private _modal: ModalService, public inputView: InputViewService<Team>) {
    classBinder.bind('skt-tasks-create');
    this.teamsStore.fetchFields();
  }

  public onSaveButtonClick(): void {
    this.teamsStore.addTeam(this.inputView.value);
  }
}
