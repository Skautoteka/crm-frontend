import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  Injector,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { IconComponent } from '../../../icon';
import { InputComponent } from '../input/input.component';

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
export class InputDateComponent extends InputComponent implements ControlValueAccessor, AfterViewInit {
  public isDateOpen = signal<boolean>(false);
  public currentDate = signal<Date>(new Date());

  public currentMonth = computed(() => {
    const currentDate = this.currentDate();
    return this._months[currentDate.getMonth()]
  })

  public chosenDate = signal<string>('');

  public currentDays = computed(() => {
    const currentDate = this.currentDate();
    const days = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    return new Array(days);
  })

  public prefixDays = computed(() => {
    const currentDate = this.currentDate();
    return new Array(this._getOffsetDays(currentDate))
  })

  public days = [
    'Pon', 'Wt', 'Sr', 'Czw', 'Pią', 'Sob', 'Nie'
  ];

  private _months = [
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
  ]

  constructor(classBinder: ClassBinder, _injector: Injector) {
    super(classBinder, _injector)
    classBinder.bind('skt-ui-input-date');
  }

  public onChevronClick(type: 'forward' | 'back'): void {
    this.currentDate.update(date => new Date(date.setMonth(date.getMonth() + (type === 'forward' ? 1 : -1))))
  }

  public onClick(): void {
    this.isDateOpen.set(true)
  }

  public onOutsideClick(): void {
    this.isDateOpen.set(false);
  }

  public onDayClick(day: number): void {
    this.isDateOpen.set(false);
    const currentDate = this.currentDate()
    this.chosenDate.set(new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1).toLocaleDateString())
  }

  private _getOffsetDays(date: Date): number {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.getDay() - 1;
  }
}
