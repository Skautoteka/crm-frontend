import { Component, forwardRef, input, signal } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { ClassBinder } from "@skautoteka-frontend/common";
import { ISingleInputConfig } from "../../interface";
import { InputComponent } from "../input/input.component";
import { InputNumberComponent } from "../input-number/input-number.component";
import { InputDateComponent } from "../input-date/input-date.component";
import { InputCheckboxComponent } from "../input-checkbox/input-checkbox.component";
import { InputSelectComponent } from "../input-select/input-select.component";
import { InputSearchComponent } from "../input-search/input-search.component";
import { InputDbComponent } from "../input-db/input-db.component";

@Component({
  selector: 'skt-ui-input-multivalue-filter',
  standalone: true,
  templateUrl: 'input-multivalue-filter.component.html',
  styleUrl: 'input-multivalue-filter.component.scss',
  providers: [
    ClassBinder,
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMultiValueFilterComponent)
    }
  ],
  imports: [
    InputComponent,
    InputNumberComponent,
    InputDateComponent,
    InputCheckboxComponent,
    InputSelectComponent,
    InputSearchComponent,
    InputDbComponent,
    ReactiveFormsModule
  ]
})
export class InputMultiValueFilterComponent implements ControlValueAccessor {
  public value = signal(null);
  public isDisabled = signal(false);

  public control = input.required<AbstractControl<any, any>>();
  public config = input.required<ISingleInputConfig>();

  protected _onChange!: (value: string) => void;
  private _onTouched!: () => void;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-input-multivalue-filter');
  }

  get formControl(): FormControl<any> {
    return this.control() as FormControl;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  writeValue(value: any): void {
    this.value.set(value)
  }
}
