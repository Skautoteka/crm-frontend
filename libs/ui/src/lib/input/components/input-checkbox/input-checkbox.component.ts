import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClassBinder } from '@skautoteka-frontend/common';
import { IconComponent } from '../../../icon';

@Component({
  standalone: true,
  selector: 'skt-ui-input-checkbox',
  templateUrl: 'input-checkbox.component.html',
  styleUrl: 'input-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconComponent],
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputCheckboxComponent)
    }
  ]
})
export class InputCheckboxComponent implements ControlValueAccessor {
  public value = signal<boolean>(false);
  public isDisabled = signal<boolean>(false);

  public isRequired = input.required<boolean>();
  public label = input.required<string>();

  private _classBinder = inject(ClassBinder);

  private _onChange!: (value: boolean) => void;
  private _onTouched!: () => void;

  constructor() {
    this._classBinder.bind('skt-ui-input-checkbox');
  }

  public onCheckboxClick(): void {
    this.value.update(v => !v);
    this._onChange(this.value());
  }

  writeValue(value: boolean): void {
    this.value.set(value);
  }

  registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
}
