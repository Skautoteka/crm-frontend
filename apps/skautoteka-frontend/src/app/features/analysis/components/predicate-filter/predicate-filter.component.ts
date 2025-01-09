import { ChangeDetectionStrategy, Component, forwardRef, input, signal, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterPredicate, PredicateFilterValue } from '../../interfaces/analysis';
import { InputComponent, InputSelectComponent, ISelectOption } from '@skautoteka-frontend/ui';
import { ClassBinder } from '@skautoteka-frontend/common';

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
  imports: [InputSelectComponent, InputComponent]
})
export class PredicateFilterComponent implements ControlValueAccessor {
  public disabled = signal(false);
  public label = input.required();

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

  private _updateUI(value: PredicateFilterValue): void {
    console.log(value);
  }
}
