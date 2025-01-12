import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ButtonComponent,
  InputContainerComponent,
  InputViewService,
  TabComponent,
  TabsComponent
} from '@skautoteka-frontend/ui';
import { Report } from '../../interfaces/report';
import { ReportsStore } from '../../store/reports.store';

@Component({
  standalone: true,
  selector: 'skt-reports-create',
  styleUrl: './reports-create.component.scss',
  templateUrl: 'reports-create.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [ButtonComponent, InputContainerComponent, TabsComponent, TabComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsCreateComponent {
  public reportsStore = inject(ReportsStore);

  constructor(classBinder: ClassBinder, public inputView: InputViewService<Report>) {
    classBinder.bind('skt-reports-create');
    this.reportsStore.fetchFields();
  }

  public onSaveButtonClick(): void {
    this.reportsStore.addReport(this.inputView.value);
  }

  public handleTabChange(tab: string | null): void {
    console.log(tab);
  }
}
