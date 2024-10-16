import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  IconCardComponent,
  LabelComponent,
  LabelContainerComponent,
  ButtonComponent,
  InputComponent,
  InputContainerComponent,
} from '@skautoteka-frontend/ui';
import { AuthStore } from '../../../auth/store/auth.store';

@Component({
  standalone: true,
  selector: 'skt-dashboard-user-profile',
  styleUrl: './dashboard-user-profile.component.scss',
  templateUrl: 'dashboard-user-profile.component.html',
  providers: [ClassBinder],
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

  public calculateAge(dateOfBirth: Date | null): number | null {
    if (!dateOfBirth) return null;

    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();

    return age;
  }
}
