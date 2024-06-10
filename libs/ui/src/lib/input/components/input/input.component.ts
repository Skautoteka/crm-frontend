import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'skt-ui-input',
  styleUrl: './input.component.scss',
  templateUrl: 'input.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
  ],
  imports: [FormsModule],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string | null = 'null';
  public placeholderText = input<string>('');

  public test = 'asdasdasd';

  private _value = '';
  private _isDisabled = false;

  private _onChange!: () => void;
  private _onTouched!: () => void;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-input');
  }

  writeValue(value: string): void {
    this._value = value;
  }

  registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
}
