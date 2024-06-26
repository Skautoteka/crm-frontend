import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { SimpleButtonComponent } from '../../../button';
import { DialogService } from '../../../overlay';

export interface ActionsConfig {
  type: 'DELETE' | 'EDIT';
  text: string;
  callback: () => void;
}

@Component({
  selector: 'skt-ui-side-content-header-actions',
  templateUrl: './side-content-header-actions.component.html',
  styleUrl: './side-content-header-actions.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [SimpleButtonComponent]
})
export class SideContentheaderActionsComponent {
  public config = input<ActionsConfig[]>([]);

  constructor(classBinder: ClassBinder, private _dialog: DialogService) {
    classBinder.bind('skt-ui-side-content-header-actions');
  }

  public onActionClick(): void {
    const ref = this._dialog.createPrompt({
      message: 'Czy na pewno chcesz usunąć rekord?',
      auxiliaryMessage: 'Usunięcie skutkuje całkowitym usunięciem danych',
      confirmInfo: {
        message: 'Tak, usuwam',
        callback: () => {
          this.config()[0].callback();
          ref.close();
        }
      },
      cancelInfo: {
        message: 'Nie usuwaj',
        callback: () => ref.close()
      }
    });
  }
}
