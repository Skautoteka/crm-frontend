import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

@Component({
  standalone: true,
  selector: 'skt-user-avatar',
  imports: [],
  providers: [ClassBinder],
  templateUrl: 'user-avatar.component.html',
  styleUrl: 'user-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UserAvatarComponent {
  public id = input<string | undefined>('');

  private _classBinder = inject(ClassBinder);

  constructor() {
    this._classBinder.bind('skt-user-avatar');
  }
}
