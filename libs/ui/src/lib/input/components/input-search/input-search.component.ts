import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  Injector,
  input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { InputComponent } from '../input/input.component';
import { ISelectOption } from '../../interface';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'skt-ui-input-search',
  styleUrl: './input-search.component.scss',
  templateUrl: './input-search.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ReactiveFormsModule, CommonModule, OverlayModule],
  providers: [
    ClassBinder,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputSearchComponent)
    }
  ]
})
export class InputSearchComponent extends InputComponent implements ControlValueAccessor, AfterViewInit {
  public searchType = input.required<string | null>();

  public dropdownVisible = signal<boolean>(false);

  public query = new FormControl('');
  public options = signal<ISelectOption[]>([])

  public activeOption = signal<ISelectOption | null>(null);

  private _http = inject(HttpClient);

  constructor(classBinder: ClassBinder, _injector: Injector) {
    super(classBinder, _injector)
    classBinder.bind('skt-ui-input-search');

    this.query.valueChanges.pipe(debounceTime(500), takeUntilDestroyed()).subscribe(query => this._updateSearchQuery(query))
  }

  public onClick(): void {
    this.dropdownVisible.set(true);
  }

  public onOptionClick(option: any): void {
    console.log(option)
    this.dropdownVisible.set(false)
  }

  public onOutsideClick(): void {
    this.dropdownVisible.set(false);
  }

  private _updateSearchQuery(query: string | null): void {
    const searchType = this.searchType()

    if(!query || !searchType) {
      return;
    }

    this._http.get(`api/${searchType}/search?search=${query}`).subscribe(x => console.log(x))
  }
}
