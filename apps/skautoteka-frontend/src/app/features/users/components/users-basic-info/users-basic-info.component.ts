import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  LabelComponent,
  LabelContainerComponent,
  ListCardComponent,
  TabComponent,
  TabsComponent,
  TagComponent
} from '@skautoteka-frontend/ui';
import { UsersStore } from '../../store/users.store';

@Component({
  standalone: true,
  selector: 'skt-users-basic-info',
  styleUrl: './users-basic-info.component.scss',
  templateUrl: 'users-basic-info.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabsComponent,
    TabComponent,
    ListCardComponent,
    LabelComponent,
    DatePipe,
    AsyncPipe,
    LabelContainerComponent,
    TagComponent
  ]
})
export class UsersBasicInfoComponent {
  public usersStore = inject(UsersStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-users-basic-info');
  }
}
