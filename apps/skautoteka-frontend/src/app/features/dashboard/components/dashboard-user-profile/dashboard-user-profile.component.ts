import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
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
import { AsyncPipe } from '@angular/common';

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
    InputContainerComponent,
    AsyncPipe
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardUserProfileComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-dashboard-user-profile');
  }
}
