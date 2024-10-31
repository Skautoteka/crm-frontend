import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { UsersStore } from '../../store/users.store';

@Component({
  standalone: true,
  selector: 'skt-users-title',
  styleUrl: './users-title.component.scss',
  templateUrl: 'users-title.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTitleComponent {
  public usersStore = inject(UsersStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-users-title');
  }
}
