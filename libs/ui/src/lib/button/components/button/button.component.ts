import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ButtonType } from '../../interface';

@Component({
  standalone: true,
  selector: 'skt-ui-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
})
export class ButtonComponent {
  public type = input<ButtonType>('SIMPLE');

  constructor(private _classBinder: ClassBinder) {
    _classBinder.bind('skt-ui-button');
    this._handleButtonType();
  }

  private _handleButtonType(): void {
    effect(() => {
      this._classBinder.conditionalBind(
        this.type() === 'SECONDARY',
        'skt-ui-button--secondary'
      );
    });
  }
}
