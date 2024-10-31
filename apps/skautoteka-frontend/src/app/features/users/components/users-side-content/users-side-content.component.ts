import { ChangeDetectionStrategy, Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ActionsConfig,
  ContentService,
  SideContentComponent,
  SideContentheaderActionsComponent,
  SideContentHeaderComponent,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent
} from '@skautoteka-frontend/ui';
import { UsersBasicInfoComponent } from '../users-basic-info/users-basic-info.component';
import { UsersTitleComponent } from '../users-title/users-title.component';
import { UsersRatingComponent } from '../users-rating/users-rating.component';
import { UsersStore } from '../../store/users.store';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'skt-users-side-content',
  styleUrl: './users-side-content.component.scss',
  templateUrl: 'users-side-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SideContentComponent,
    SideContentSectionHeaderComponent,
    SideContentSectionComponent,
    UsersBasicInfoComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent,
    UsersTitleComponent,
    UsersRatingComponent
  ]
})
export class UsersSideContentComponent {
  public usersStore = inject(UsersStore);
  public actionsConfig: ActionsConfig[] = [
    {
      type: 'DELETE',
      text: 'Usuń raport',
      callback: () => this._deleteUser()
    }
  ];

  private _router = inject(Router);

  constructor(classBinder: ClassBinder, private _content: ContentService) {
    classBinder.bind('skt-users-side-content');
    this._showSideContent();

    if (!this.usersStore.activeUser()) {
      this._router.navigate(['/', 'dashboard', 'users']);
    }
  }

  public onMobileBackClick(): void {
    this.usersStore.setActiveUser(null);
  }

  private _showSideContent() {
    effect(() => {
      const activeUser = this.usersStore.activeUser();
      if (activeUser) {
        this._content.showSideContent(!!activeUser);
      }
    });
  }

  private _deleteUser(): void {
    const activeUser = this.usersStore.activeUser();

    if (!activeUser) {
      return;
    }

    this.usersStore.removeUser(activeUser.id);
  }
}
