import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Injector,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'skt-ui-input-number',
  styleUrl: './input-number.component.scss',
  templateUrl: './input-number.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, CommonModule, NgIf],
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputNumberComponent)
    }
  ]
})
export class InputNumberComponent implements ControlValueAccessor, AfterViewInit {
  public placeholder = input<string>('');
  public label = input<string | null>(null);
  public isRequired = input<boolean>(false);
  public isDisabled = input<boolean>(false);
  public invalid = signal<boolean>(false);
  public startValue = input<any>(null);
  public min = input<number | null>(null);
  public max = input<number | null>(null);

  protected _value = this.startValue();
  private _control!: NgControl;
  private _isDisabled = false;
  private _destroyRef = inject(DestroyRef);

  protected _onChange!: (value: number) => void;
  private _onTouched!: () => void;

  constructor(classBinder: ClassBinder, private _injector: Injector) {
    classBinder.bind('skt-ui-input-number');
  }

  ngAfterViewInit(): void {
    this._control = this._injector.get(NgControl);
    if (this.startValue()) {
      this._value = this.startValue();
      if (this._onChange) {
        this._onChange(this._value);
      }
    }

    this._updateValidUi();
  }

  public onBlur(): void {
    this.invalid.set(!this._control.valid);
  }

  public onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.valueAsNumber;

    if (isNaN(value)) {
      if (this._onChange) {
        this._onChange(this._value);
      }
      return;
    }

    const minValue = this.min();
    const maxValue = this.max();

    if (minValue !== null && value < minValue) {
      value = minValue;
      inputElement.value = value.toString();
    } else if (maxValue !== null && value > maxValue) {
      value = maxValue;
      inputElement.value = value.toString();
    }

    this._value = value;
    if (this._onChange) {
      this._onChange(this._value);
    }
  }

  writeValue(value: number | null): void {
    this._value = value ?? this.startValue();
    // Update the input element if it exists
    const inputElement = document.querySelector('input.skt-ui-input-number__input') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = this._value !== null ? this._value.toString() : '';
    }
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  private _updateValidUi(): void {
    if (!this._control.statusChanges) {
      return;
    }

    this._control.statusChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(event => {
      if (event === 'VALID') {
        this.invalid.set(false);
      }

      if (event === 'INVALID') {
        this.invalid.set(true);
      }
    });
  }
}
