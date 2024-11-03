import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  LabelComponent,
  ListCardComponent,
  TabComponent,
  TabsComponent,
  TableComponent,
  TableRowCellComponent,
  TableRowComponent,
  TagComponent
} from '@skautoteka-frontend/ui';
import { DatePipe } from '@angular/common';
import { UsersStore } from '../../store/users.store';

@Component({
  standalone: true,
  selector: 'skt-users-content',
  styleUrl: './users-content.component.scss',
  templateUrl: 'users-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabsComponent,
    TabComponent,
    ListCardComponent,
    LabelComponent,
    TableComponent,
    TableRowCellComponent,
    TableRowComponent,
    TagComponent,
    DatePipe
  ]
})
export class UsersContentComponent {
  public usersStore = inject(UsersStore);
  public tableDef = [
    { name: 'Zdjecie', width: '4rem', hidden: true },
    { name: 'Imię', width: '15%' },
    { name: 'Nazwisko', width: '15%' },
    { name: 'Email', width: '25%' },
    { name: 'Telefon', width: '15%' },
    { name: 'Region', width: '15%' },
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
