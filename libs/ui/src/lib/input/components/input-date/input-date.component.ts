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
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OverlayModule } from '@angular/cdk/overlay';
import { IconComponent } from '../../../icon';

@Component({
  selector: 'skt-ui-input-date',
  styleUrl: './input-date.component.scss',
  templateUrl: './input-date.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, FormsModule, CommonModule, NgIf, OverlayModule, IconComponent],
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputDateComponent)
    }
  ]
})
export class InputDateComponent implements ControlValueAccessor, AfterViewInit {
  public placeholder = input<string>('');
  public label = input<string | null>(null);
  public isRequired = input<boolean>(false);
  public invalid = signal<boolean>(false);

  public isDateOpen = signal<boolean>(false);
  public currentDate = signal<Date>(new Date());

  public currentMonth = computed(() => {
    const currentDate = this.currentDate();
    const month = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień"
    ];

    return month[currentDate.getMonth()]
  })

  protected _value = '';
  private _control!: NgControl;
  private _isDisabled = false;
  private _destroyRef = inject(DestroyRef);

  private _onChange!: (value: string) => void;
  private _onTouched!: () => void;

  constructor(classBinder: ClassBinder, private _injector: Injector) {
    classBinder.bind('skt-ui-input-date');
  }

  ngAfterViewInit(): void {
    this._control = this._injector.get(NgControl);
    this._updateValidUi();
  }

  public onChevronClick(type: 'forward' | 'back'): void {
    this.currentDate.update(date => new Date(date.setMonth(date.getMonth() + (type === 'forward' ? 1 : -1))))
  }

  public onClick(): void {
    this.isDateOpen.set(true)
  }

  public onOutsideClick(): void {
    this.isDateOpen.set(false)
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
