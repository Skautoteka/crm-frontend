import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ButtonComponent,
  InputComponent,
  InputContainerComponent,
  InputViewService,
  LoaderComponent,
} from '@skautoteka-frontend/ui';
import { Player } from '../../interfaces';
import { PlayersStore } from '../../store/players.store';

@Component({
  standalone: true,
  selector: 'skt-players-create',
  styleUrl: './players-create.component.scss',
  templateUrl: 'players-create.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [InputComponent, ButtonComponent, InputContainerComponent, LoaderComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCreateComponent {
  public playersStore = inject(PlayersStore)

  constructor(
    classBinder: ClassBinder,
    public inputView: InputViewService<Player>
  ) {
    classBinder.bind('skt-players-create');
    this.playersStore.fetchFields();
  }

  public onSaveButtonClick(): void {
    this.playersStore.addPlayer(this.inputView.value)
  }
}
