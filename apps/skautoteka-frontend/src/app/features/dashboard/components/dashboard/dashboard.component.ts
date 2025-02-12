import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { SidenavComponent } from '@skautoteka-frontend/ui';
import { ClassBinder } from '@skautoteka-frontend/common';
import { DashboardUserComponent } from '../dashboard-user/dashboard-user.component';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../auth/store/auth.store';

@Component({
  standalone: true,
  selector: 'skt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [SidenavComponent, DashboardUserComponent, RouterModule],
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  public authStore = inject(AuthStore);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-dashboard');
  }

  public onLogoutClicked(): void {
    this.authStore.logout();
  }
}
