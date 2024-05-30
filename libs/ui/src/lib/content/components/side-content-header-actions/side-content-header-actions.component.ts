import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { SimpleButtonComponent } from '../../../button';

export interface ActionsConfig {
  type: 'DELETE' | 'EDIT'
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

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-side-content-header-actions');
  }
}
