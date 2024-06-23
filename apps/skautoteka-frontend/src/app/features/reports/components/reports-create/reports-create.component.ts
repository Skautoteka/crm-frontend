import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ButtonComponent,
  InputComponent,
  InputConfig,
  InputContainerComponent,
  InputViewService,
  ModalService
} from '@skautoteka-frontend/ui';
import { ReportsService } from '../../services';
import { AsyncPipe } from '@angular/common';
import { Report } from '../../interfaces/report';

@Component({
  standalone: true,
  selector: 'skt-reports-create',
  styleUrl: './reports-create.component.scss',
  templateUrl: 'reports-create.component.html',
  providers: [ClassBinder, InputViewService],
  imports: [InputComponent, ButtonComponent, InputContainerComponent, AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsCreateComponent {
  public config = signal<InputConfig | null>(null);

  constructor(
    classBinder: ClassBinder,
    private _report: ReportsService,
    private _modal: ModalService,
    public inputView: InputViewService<Report>
  ) {
    classBinder.bind('skt-reports-create');
    this._report.getCreateFieldsConfig$().subscribe(config => this.config.set(config));
  }

  public onSaveButtonClick(): void {
    this._report.addReport$(this.inputView.value).subscribe(() => this._modal.closeAll());
  }
}
