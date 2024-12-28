import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Injector,
  input,
  signal,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { IconComponent } from '../../../icon';
import { InputComponent } from '../input/input.component';
import { ISelectOption } from '../../interface';

@Component({
  selector: 'skt-ui-input-select',
  styleUrl: './input-select.component.scss',
  templateUrl: './input-select.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, CommonModule, OverlayModule, IconComponent],
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputSelectComponent)
    }
  ]
})
export class InputSelectComponent extends InputComponent implements ControlValueAccessor, AfterViewInit, OnInit {
  public dropdownVisible = signal<boolean>(false);
  public options = input.required<ISelectOption[]>();
  public override startValue = input<any>(null);

  public activeOption = signal<ISelectOption | null>(null);

  constructor(classBinder: ClassBinder, _injector: Injector) {
    super(classBinder, _injector);
    classBinder.bind('skt-ui-input-select');
  }

  ngOnInit() {
    if (this.startValue()) {
      const initialOption = this.options().find(option => option.value === this.startValue());
      if (initialOption) {
        this.activeOption.set(initialOption);
      }
    }
  }

  public onClick(): void {
    this.dropdownVisible.set(true);
  }

  public onOptionClick(option: ISelectOption): void {
    this.activeOption.set(option);
    this._onChange(option.value);

    this.dropdownVisible.set(false);
  }

  public onOutsideClick(): void {
    this.dropdownVisible.set(false);
  }
}
