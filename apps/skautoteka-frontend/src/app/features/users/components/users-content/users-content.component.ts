import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  InfinitePipe,
  SearchPipe,
  TableComponent,
  TableRowCellComponent,
  TableRowComponent
} from '@skautoteka-frontend/ui';
import { UsersStore } from '../../store/users.store';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserAvatarComponent } from '../../../dashboard/components/user-avatar/user-avatar.component';

@Component({
  standalone: true,
  selector: 'skt-users-content',
  styleUrl: './users-content.component.scss',
  templateUrl: 'users-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableComponent,
    TableRowCellComponent,
    TableRowComponent,
    InfinitePipe,
    SearchPipe,
    NgFor,
    AsyncPipe,
    UserAvatarComponent
  ]
})
export class UsersContentComponent {
  public usersStore = inject(UsersStore);
  public tableDef = [
    { name: 'Zdjecie', width: '4rem', hidden: true },
    { name: 'Imię', width: '20%' },
    { name: 'Nazwisko', width: '20%' },
    { name: 'Email', width: '30%' },
    { name: 'Rola', width: '10%' }
  ];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-users-content');
    this.usersStore.getUsers();
  }

  public onRowClicked(id: string): void {
    this.usersStore.setActiveUser(id);
  }
}
