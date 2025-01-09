import { ChangeDetectionStrategy, Component, forwardRef, input, signal, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FilterPredicate, PredicateFilterValue } from '../../interfaces/analysis';
import { InputNumberComponent, InputSelectComponent, ISelectOption } from '@skautoteka-frontend/ui';
import { ClassBinder } from '@skautoteka-frontend/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'skt-predicate-filter',
  templateUrl: 'predicate-filter.component.html',
  styleUrl: 'predicate-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PredicateFilterComponent),
      multi: true
    }
  ],
  imports: [InputSelectComponent, InputNumberComponent, ReactiveFormsModule]
})
export class PredicateFilterComponent implements ControlValueAccessor {
  public disabled = signal(false);
  public label = input.required();

  public predicateControl = new FormControl();
  public valueControl = new FormControl();

  public options: ISelectOption[] = [
    { value: FilterPredicate.lt, label: '<' },
    { value: FilterPredicate.le, label: '<=' },
    { value: FilterPredicate.gt, label: '>' },
    { value: FilterPredicate.ge, label: '>=' },
    { value: FilterPredicate.eq, label: '=' },
    { value: FilterPredicate.ne, label: '!=' },
    { value: FilterPredicate.avg_lt, label: '< (średnia)' },
    { value: FilterPredicate.avg_le, label: '<= (średnia)' },
    { value: FilterPredicate.avg_gt, label: '> (średnia)' },
    { value: FilterPredicate.avg_ge, label: '>= (średnia)' },
    { value: FilterPredicate.avg_eq, label: '= (średnia)' },
    { value: FilterPredicate.avg_ne, label: '!= (średnia)' }
  ];

  private _onTouched!: () => void;
  private _onChange!: (value: PredicateFilterValue) => void;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-predicate-filter');
    this._onControlsChange();
  }

  public registerOnChange(fn: (value: PredicateFilterValue) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  public writeValue(value: PredicateFilterValue): void {
    this._updateUI(value);
  }

  private _updateUI(value: PredicateFilterValue): void {}

  private _onControlsChange(): void {
    this.predicateControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this._updateValue());
    this.valueControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this._updateValue());
  }

  private _updateValue(): void {
    const predicate = this.predicateControl.value;
    const value = this.valueControl.value;

    this._onChange({
      predicate,
      value
    });
  }
}
