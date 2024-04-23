import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { DashboardUserActionsComponent } from '../dashboard-user-actions/dashboard-user-actions.component';

@Component({
  standalone: true,
  selector: 'skt-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DashboardUserActionsComponent],
})
export class DashboardUserComponent {
  public userName = 'John Smith';
  public userRole = 'Junior Skaut';

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-dashboard-user');
  }

  public onActionClicked(type: 'notifications' | 'user-profile'): void {
    console.log(type);
  }
}
