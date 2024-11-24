import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  forwardRef,
  inject,
  Injector,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ControlValueAccessor, FormArray, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ISingleInputConfig } from '../../interface';
import { InputSelectComponent } from '../input-select/input-select.component';
import { ButtonComponent } from '../../../button';
import { InputMultiValueFilterComponent } from '../input-multivalue-filter/input-multivalue-filter.component';

@Component({
  selector: 'skt-ui-input-multivalue',
  styleUrl: 'input-multivalue.component.scss',
  templateUrl: 'input-multivalue.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputSelectComponent,
    ButtonComponent,
    InputMultiValueFilterComponent
  ],
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputMultivalueComponent)
    }
  ]
})
export class InputMultivalueComponent implements ControlValueAccessor, AfterViewInit {
  public placeholder = input<string>('');
  public label = input<string | null>(null);
  public isRequired = input<boolean>(false);
  public invalid = signal<boolean>(false);
  public valueTypes = input<ISingleInputConfig[] | null>(null);

  public chosenOption = signal(null);
  public errors = signal<ValidationErrors | null>(null);

  public options = computed(() => {
    const types = this.valueTypes();

    if(!types) {
      return [];
    }

    return types.map(type => ({ value: type.name, label: type.label }))
  })

  public addedFilters = signal<ISingleInputConfig[]>([]);
  public filters = new FormArray<any>([]);

  protected _value = '';
  private _control!: NgControl;
  private _isDisabled = false;
  private _destroyRef = inject(DestroyRef);

  protected _onChange!: (value: string) => void;
  private _onTouched!: () => void;

  constructor(classBinder: ClassBinder, private _injector: Injector) {
    classBinder.bind('skt-ui-input-multivalue');
  }

  ngAfterViewInit(): void {
    this._control = this._injector.get(NgControl);
    this._updateValidUi();
  }

  public onAddFilterClick(): void {
    const name = this.chosenOption()
    const config = this.valueTypes()?.find(type => type.name === name);
    this.chosenOption.set(null);

    if(!config) {
      throw new Error('Could not add filter');
    }

    this.addedFilters.update(filters => [...filters, config])
    this.filters.push(new FormControl(null))
  }

  public getFilterConfig(id: number): ISingleInputConfig {
    const configs = this.addedFilters();
    const config = configs[id];
    return config;
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
