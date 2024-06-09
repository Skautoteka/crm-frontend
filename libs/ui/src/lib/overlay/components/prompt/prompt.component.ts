import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IPromptOptions } from '../../interface/idialog';

@Component({
  standalone: true,
  selector: 'skt-ui-prompt',
  styleUrl: './prompt.component.scss',
  templateUrl: 'prompt.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptComponent {
  @Input() options!: IPromptOptions;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-prompt');
  }
}
