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
  public min = input<number | null>(Number.MIN_SAFE_INTEGER);
  public max = input<number | null>(Number.MAX_SAFE_INTEGER);

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

    if (this.startValue) {
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

  public onInputChange(value: number): void {
    this._value = value;
    this._onChange(this._value);
  }

  writeValue(value: number): void {
    this._value = value ?? this.startValue();
    if (this._onChange) {
      this._onChange(this._value);
    }
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
