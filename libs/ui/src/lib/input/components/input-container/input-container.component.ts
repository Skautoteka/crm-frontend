import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, input, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputConfig } from '../../interface';
import { InputComponent } from '../input/input.component';
import { InputViewService } from '../../services';
import { InputDateComponent } from '../input-date/input-date.component';
import { InputCheckboxComponent } from '../input-checkbox/input-checkbox.component';
import { InputSelectComponent } from '../input-select/input-select.component';
import { InputSearchComponent } from '../input-search/input-search.component';
import { InputNumberComponent } from '../input-number/input-number.component';
import { InputDbComponent } from '../input-db/input-db.component';
import { InputTextComponent } from '../input-text/input-text.component';

@Component({
  selector: 'skt-ui-input-container',
  styleUrl: './input-container.component.scss',
  templateUrl: './input-container.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    InputDateComponent,
    InputCheckboxComponent,
    InputSelectComponent,
    InputSearchComponent,
    InputNumberComponent,
    InputDbComponent,
    InputTextComponent
  ],
  providers: [ClassBinder]
})
export class InputContainerComponent<K> {
  public config = input<InputConfig | null>(null);
  public formGroup: FormGroup | null = null;

  constructor(
    classBinder: ClassBinder,
    private _fb: FormBuilder,
    private _cdRef: ChangeDetectorRef,
    private _inputView: InputViewService<K>
  ) {
    classBinder.bind('skt-ui-input-container');
    this._buildInputs();
  }

  private _buildInputs(): void {
    effect(() => {
      if (this.formGroup) {
        return;
      }

      const config = this.config();
      if (config) {
        const controls = config.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.name]: new FormControl(curr?.value, { validators: curr.isRequired ? [Validators.required] : [] })
          }),
          {}
        );

        this.formGroup = this._fb.group(controls);
        this._inputView.setFormGroup(this.formGroup);
        this._cdRef.detectChanges();
      }
    });
  }
}
