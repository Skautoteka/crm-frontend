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
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'skt-ui-input-password',
  styleUrl: './input-password.component.scss',
  templateUrl: './input-password.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, FormsModule, CommonModule],
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputPasswordComponent)
    }
  ]
})
export class InputPasswordComponent implements ControlValueAccessor, AfterViewInit {
  public invalid = signal<boolean>(false);
  public errors = signal<ValidationErrors | null>(null);
  public label = input('Hasło');
  public placeholder = input('Wpisz swoje hasło');

  protected _value = '';
  private _control!: NgControl;
  private _destroyRef = inject(DestroyRef);

  private _onChange!: (value: string) => void;
  private _onTouched!: () => void;

  constructor(classBinder: ClassBinder, private _injector: Injector) {
    classBinder.bind('skt-ui-input-password');
  }

  ngAfterViewInit(): void {
    this._control = this._injector.get(NgControl);
    this._updateValidUi();
  }

  public onBlur(): void {
    this.invalid.set(!this._control.valid);
    this.errors.set(this._control.errors);
  }

  public onInputChange(value: string): void {
    this._value = value;
    this._onChange(this._value);
  }

  writeValue(value: string): void {
    this._value = value;
  }

  registerOnChange(fn: () => void): void {
    this._onChange = fn;
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
