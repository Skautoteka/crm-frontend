import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { SquareButtonComponent, ModalService } from '@skautoteka-frontend/ui';
import { DashboardUserProfileComponent } from '../dashboard-user-profile/dashboard-user-profile.component';

@Component({
  standalone: true,
  selector: 'skt-dashboard-user-actions',
  styleUrl: './dashboard-user-actions.component.scss',
  templateUrl: './dashboard-user-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [SquareButtonComponent]
})
export class DashboardUserActionsComponent {
  @Output() actionClicked: EventEmitter<'notifications' | 'user-profile'> = new EventEmitter<
    'notifications' | 'user-profile'
  >();

  constructor(classBinder: ClassBinder, private _modal: ModalService) {
    classBinder.bind('skt-dashboard-user-actions');
  }

  public onActionClicked(type: 'notifications' | 'user-profile'): void {
    if (type === 'user-profile') {
      this._modal.createModal(DashboardUserProfileComponent, {
        header: 'Profil skauta',
        subHeader: 'Wypełnij wszystkie wymagane informacje o zadaniu i zapisz zmiany'
      });
    }
    this.actionClicked.emit(type);
  }
}
