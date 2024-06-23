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
import { PlayersService } from '../../services';

@Component({
  standalone: true,
  selector: 'skt-players-create',
  styleUrl: './players-create.component.scss',
  templateUrl: 'players-create.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [InputComponent, ButtonComponent, InputContainerComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCreateComponent {
  public config = signal<InputConfig | null>(null);

  constructor(
    classBinder: ClassBinder,
    private _players: PlayersService,
    private _modal: ModalService,
    public inputView: InputViewService<Report>
  ) {
    classBinder.bind('skt-players-create');
  }

  public onSaveButtonClick(): void {
    this._players;
  }
}
