import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ButtonComponent, InputComponent, InputContainerComponent, InputViewService } from '@skautoteka-frontend/ui';
import { AsyncPipe } from '@angular/common';
import { User } from '../../interfaces/user';
import { UsersStore } from '../../store/users.store';

@Component({
  standalone: true,
  selector: 'skt-users-create',
  styleUrl: './users-create.component.scss',
  templateUrl: 'users-create.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [InputComponent, ButtonComponent, InputContainerComponent, AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersCreateComponent {
  public usersStore = inject(UsersStore);

  constructor(classBinder: ClassBinder, public inputView: InputViewService<User>) {
    classBinder.bind('skt-users-create');
    this.usersStore.fetchFields();
  }

  public onSaveButtonClick(): void {
    this.usersStore.addUser(this.inputView.value);
  }
}
