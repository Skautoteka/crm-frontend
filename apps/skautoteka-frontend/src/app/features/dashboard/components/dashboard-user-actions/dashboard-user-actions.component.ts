import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { SquareButtonComponent } from '../../../../../../../../libs/ui/src/lib/button';

@Component({
  standalone: true,
  selector: 'skt-dashboard-user-actions',
  styleUrl: './dashboard-user-actions.component.scss',
  templateUrl: './dashboard-user-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [SquareButtonComponent],
})
export class DashboardUserActionsComponent {
  @Output() actionClicked: EventEmitter<'notifications' | 'user-profile'> =
    new EventEmitter<'notifications' | 'user-profile'>();

  public onActionClicked(type: 'notifications' | 'user-profile'): void {
    this.actionClicked.emit(type);
  }

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-dashboard-user-actions');
  }
}
