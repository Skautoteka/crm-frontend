import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder, DeviceService } from '@skautoteka-frontend/common';
import { DashboardUserActionsComponent } from '../dashboard-user-actions/dashboard-user-actions.component';
import { AsyncPipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { AuthStore } from '../../../auth/store/auth.store';

@Component({
  standalone: true,
  selector: 'skt-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DashboardUserActionsComponent, AsyncPipe, TitleCasePipe, NgOptimizedImage]
})
export class DashboardUserComponent {
  public authStore = inject(AuthStore);

  constructor(classBinder: ClassBinder, public device: DeviceService) {
    classBinder.bind('skt-dashboard-user');
  }

  public onActionClicked(type: 'notifications' | 'user-profile'): void {}
}
