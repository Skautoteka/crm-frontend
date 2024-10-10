import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  IconCardComponent,
  LabelComponent,
  LabelContainerComponent,
  ButtonComponent,
  InputComponent,
  InputContainerComponent,
  InputViewService
} from '@skautoteka-frontend/ui';
import { AuthStore } from '../../../auth/store/auth.store';

@Component({
  standalone: true,
  selector: 'skt-dashboard-user-profile',
  styleUrl: './dashboard-user-profile.component.scss',
  templateUrl: 'dashboard-user-profile.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [
    IconCardComponent,
    LabelComponent,
    LabelContainerComponent,
    InputComponent,
    ButtonComponent,
    InputContainerComponent
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardUserProfileComponent {
  public authStore = inject(AuthStore);
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-dashboard-user-profile');
  }
}
