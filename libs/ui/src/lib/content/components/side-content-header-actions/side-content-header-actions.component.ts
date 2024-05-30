import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';

interface ActionsConfig {
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
})
export class SideContentheaderActionsComponent {
  public type = input<ActionsConfig[]>([]);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-side-content-header-actions');
  }
}
