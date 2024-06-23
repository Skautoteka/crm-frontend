import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ButtonComponent,
  InputComponent,
  InputConfig,
  InputContainerComponent,
  InputViewService,
  ModalService
} from '@skautoteka-frontend/ui';
import { AsyncPipe } from '@angular/common';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../interfaces/team';

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
  public config = signal<InputConfig | null>(null);

  constructor(
    classBinder: ClassBinder,
    private _teams: TeamsService,
    private _modal: ModalService,
    public inputView: InputViewService<Team>
  ) {
    classBinder.bind('skt-tasks-create');
    this._teams.getCreateFieldsConfig$().subscribe(config => this.config.set(config));
  }

  public onSaveButtonClick(): void {
    this._teams.addTeam$(this.inputView.value).subscribe(() => this._modal.closeAll());
  }
}
