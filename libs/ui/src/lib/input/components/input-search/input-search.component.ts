import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  input,
  signal,
  viewChild,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { InputComponent } from '../input/input.component';
import { ISelectOption } from '../../interface';
import { debounceTime, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { IconComponent } from '../../../icon';

@Component({
  selector: 'skt-ui-input-search',
  styleUrl: './input-search.component.scss',
  templateUrl: './input-search.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ReactiveFormsModule, CommonModule, OverlayModule, IconComponent],
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputSearchComponent)
    }
  ]
})
export class InputSearchComponent extends InputComponent implements ControlValueAccessor, AfterViewInit, OnInit {
  public searchType = input.required<string | null>();

  public dropdownVisible = signal<boolean>(false);

  public query = new FormControl('');
  public queryLoading = signal<boolean>(false);

  public options = signal<ISelectOption[]>([]);
  public override startValue = input<any>(null);
  public startValueId = input<any>(null);

  public activeOption = signal<ISelectOption | null>(null);

  private _http = inject(HttpClient);
  private _input = viewChild.required('input', { read: ElementRef });

  constructor(classBinder: ClassBinder, _injector: Injector) {
    super(classBinder, _injector);
    classBinder.bind('skt-ui-input-search');

    this.query.valueChanges
      .pipe(
        tap(() => {
          this.options.set([]);
          this.queryLoading.set(true);
        }),
        debounceTime(500),
        takeUntilDestroyed()
      )
      .subscribe(query => this._updateSearchQuery(query));
  }

  ngOnInit() {
    if (this.startValue() && this.startValueId()) {
      const defaultOption = { value: this.startValueId(), label: this.startValue() };
      this.activeOption.set(defaultOption);
      setTimeout(() => {
        this._onChange(this.startValueId());
        if (this._input()?.nativeElement) {
          this._onChange(defaultOption.value);
          this._input().nativeElement.value = defaultOption.label;
        }
      });
    }
  }

  public onClick(): void {
    this.dropdownVisible.set(true);
  }

  public onOptionClick(option: ISelectOption): void {
    this.dropdownVisible.set(false);

    this.activeOption.set(option);
    this._onChange(option.value);
    this._input().nativeElement.value = option.label;
  }

  public onOutsideClick(): void {
    this.dropdownVisible.set(false);

    if (!this.activeOption()) {
      this.query.setValue('', { emitEvent: false });
    } else {
      this._input().nativeElement.value = this.activeOption()?.label;
    }
  }

  public onCloseClick(): void {
    this.activeOption.set(null);
    this.query.setValue('', { emitEvent: false });
  }

  private _updateSearchQuery(query: string | null): void {
    const searchType = this.searchType();

    if (!query || !searchType) {
      return;
    }

    this._http
      .get<{ id: string; name: string }[]>(`api/${searchType}/search?search=${query}`)
      .subscribe(results => this._updateQueryResults(results));
  }

  private _updateQueryResults(results: { id: string; name: string }[]): void {
    this.queryLoading.set(false);
    this.options.set(results.map(result => ({ value: result.id, label: result.name })));
  }
}
