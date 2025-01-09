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
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl, ValidationErrors } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'skt-ui-input-text',
  styleUrl: './input-text.component.scss',
  templateUrl: './input-text.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, FormsModule, CommonModule, NgIf],
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputTextComponent)
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor, AfterViewInit {
  public placeholder = input<string>('');
  public label = input<string | null>(null);
  public isRequired = input<boolean>(false);
  public isDisabled = input<boolean>(false);
  public invalid = signal<boolean>(false);

  public errors = signal<ValidationErrors | null>(null);

  protected _value = '';
  private _control!: NgControl;
  private _isDisabled = false;
  private _destroyRef = inject(DestroyRef);

  protected _onChange!: (value: string) => void;
  private _onTouched!: () => void;

  constructor(classBinder: ClassBinder, private _injector: Injector) {
    classBinder.bind('skt-ui-input-text');
  }

  ngAfterViewInit(): void {
    this._control = this._injector.get(NgControl);
    this._updateValidUi();
  }

  public onBlur(): void {
    this._onTouched();
  }

  public onInputChange(value: string): void {
    this._value = value;
    this._onChange(this._value);
  }

  writeValue(value: string): void {
    this._value = value;
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
    if (!this._control.valueChanges) {
      return;
    }

    this._control.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      const errors = this._control.errors;
      this.errors.set(errors);
      this.invalid.set(!!errors);
    });
  }
}
