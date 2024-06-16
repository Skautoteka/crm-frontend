import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ButtonComponent,
  InputComponent,
  InputConfig,
  InputContainerComponent,
} from '@skautoteka-frontend/ui';
import { ReportsService } from '../../services';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skt-reports-create',
  styleUrl: './reports-create.component.scss',
  templateUrl: 'reports-create.component.html',
  providers: [ClassBinder],
  imports: [
    InputComponent,
    ButtonComponent,
    InputContainerComponent,
    AsyncPipe,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsCreateComponent {
  public config = signal<InputConfig | null>(null);

  constructor(classBinder: ClassBinder, private _tasks: ReportsService) {
    classBinder.bind('skt-reports-create');

    this._tasks
      .getCreateFieldsConfig$()
      .subscribe((config) => this.config.set(config));
  }
}
