import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ButtonComponent,
  InputPasswordComponent,
  LabelComponent,
  LabelContainerComponent,
  ModalService,
  NotificationsService,
  TabComponent,
  TabsComponent
} from '@skautoteka-frontend/ui';
import { AuthStore } from '../../../auth/store/auth.store';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'skt-dashboard-user-profile',
  styleUrl: './dashboard-user-profile.component.scss',
  templateUrl: 'dashboard-user-profile.component.html',
  providers: [ClassBinder],
  imports: [
    LabelComponent,
    LabelContainerComponent,
    TabsComponent,
    TabComponent,
    InputPasswordComponent,
    FormsModule,
    ButtonComponent
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardUserProfileComponent {
  public authStore = inject(AuthStore);
  public tab = signal<string | null>(null);

  public current = signal('');
  public newPassword = signal('');
  public confirmPassword = signal('');

  public isDisabled = computed(() => {
    return !this.current().length || !this.newPassword().length || !this.confirmPassword().length;
  });

  private _http = inject(HttpClient);
  private _notifications = inject(NotificationsService);
  private _modal = inject(ModalService);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-dashboard-user-profile');
  }

  public calculateAge(dateOfBirth: Date | null): number | null {
    if (!dateOfBirth) return null;

    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();

    return age;
  }

  public handleTabChange(tab: string | null): void {
    this.tab.set(tab);
  }

  public onButtonClick(): void {
    const current = this.current();
    const newPassword = this.newPassword();
    const confirmPassword = this.confirmPassword();

    if (!current || !newPassword || !confirmPassword) {
      return;
    }

    this._http.post('api/user/change-password', { current, newPassword, confirmPassword }).subscribe({
      error: () => {
        this._notifications.error('Wystąpił błąd', 'Wystąpił błąd podczas zmiany hasła');
      },
      next: () => {
        this._modal.closeAll();
        this._notifications.success('Sukces', 'Udało się poprawnie zmienić hasło');
      }
    });
  }
}
