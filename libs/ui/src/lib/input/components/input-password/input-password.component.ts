import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Injector,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'skt-ui-input-password',
  styleUrl: './input-password.component.scss',
  templateUrl: './input-password.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, FormsModule, CommonModule, NgIf],
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
