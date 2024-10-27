import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  SideContentHeaderComponent,
  SideContentComponent,
  SideContentheaderActionsComponent,
  ButtonComponent,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent,
  TableComponent,
  ContentComponent,
  ModalService
} from '@skautoteka-frontend/ui';
import { UsersBasicInfoComponent } from '../users-basic-info/users-basic-info.component';
import { UsersContentComponent } from '../users-content/users-content.component';
import { UsersCreateComponent } from '../users-create/users-create.component';

@Component({
  standalone: true,
  selector: 'skt-users',
  styleUrl: './users.component.scss',
  templateUrl: 'users.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ContentComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent,
    SideContentComponent,
    SideContentSectionComponent,
    SideContentSectionHeaderComponent,
    ButtonComponent,
    TableComponent,
    UsersContentComponent,
    UsersBasicInfoComponent
  ]
})
export class UsersComponent {
  constructor(classBinder: ClassBinder, private _modal: ModalService) {
    classBinder.bind('skt-users');
  }

  public onAddNewClick(): void {
    this._modal.createModal(UsersCreateComponent, {
      header: 'Dodaj raport',
      subHeader: 'Wypełnij wszystkie wymagane informacje aby dodać raport'
    });
  }
}
