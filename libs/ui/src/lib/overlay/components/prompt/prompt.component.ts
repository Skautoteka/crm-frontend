import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IPromptOptions } from '../../interface/idialog';
import { ButtonComponent } from '../../../button';

@Component({
  standalone: true,
  selector: 'skt-ui-prompt',
  styleUrl: './prompt.component.scss',
  templateUrl: 'prompt.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
})
export class PromptComponent {
  @Input() options!: IPromptOptions;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-prompt');
  }

  public onConfirmClick(): void {
    if (this.options.confirmInfo) {
      this.options.confirmInfo.callback();
    }
  }

  public onCancelClick(): void {
    if (this.options.cancelInfo) {
      this.options.cancelInfo.callback();
    }
  }
}
