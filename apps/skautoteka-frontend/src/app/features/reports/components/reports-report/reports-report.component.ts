import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject, effect } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { CommonModule } from '@angular/common';
import {
  IconCardComponent,
  LabelComponent,
  LabelContainerComponent,
  ButtonComponent,
  InputComponent,
  InputContainerComponent
} from '@skautoteka-frontend/ui';
import { AuthStore } from '../../../auth/store/auth.store';
import { ReportsStore } from '../../store/reports.store';

@Component({
  standalone: true,
  selector: 'skt-reports-report',
  styleUrl: './reports-report.component.scss',
  templateUrl: 'reports-report.component.html',
  providers: [ClassBinder],
  imports: [
    IconCardComponent,
    LabelComponent,
    LabelContainerComponent,
    InputComponent,
    ButtonComponent,
    InputContainerComponent,
    CommonModule
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsReportComponent {
  public authStore = inject(AuthStore);
  public reportStore = inject(ReportsStore);

  public selectedReport = this.reportStore.selectedReport;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-reports-report');

    effect(() => {
      console.log('Selected Report changed:', this.selectedReport());
    });
  }
}
