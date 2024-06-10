import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'skt-ui-input',
  styleUrl: './input.component.scss',
  templateUrl: './input.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, CommonModule, NgIf],
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  public placeholderText = input<string>('');
  public label = input<string | null>(null);
  public isRequired = input<boolean>(false);

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
