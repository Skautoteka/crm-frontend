import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, input, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { InputConfig } from '../../interface';
import { InputComponent } from '../input/input.component';
import { InputViewService } from '../../services';

@Component({
  selector: 'skt-ui-input-container',
  styleUrl: './input-container.component.scss',
  templateUrl: './input-container.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, CommonModule, NgIf, ReactiveFormsModule, InputComponent],
  providers: [ClassBinder]
})
export class InputContainerComponent<K> {
  public config = input<InputConfig | null>(null);
  public formGroup: FormGroup | null = null;

  constructor(classBinder: ClassBinder, private _fb: FormBuilder, private _cdRef: ChangeDetectorRef, private _inputView: InputViewService<K>) {
    classBinder.bind('skt-ui-input-container');
    this._buildInputs();
  }

  private _buildInputs(): void {
    effect(() => {
      const config = this.config();
      if (config) {
        const controls = config.reduce((prev, curr) => ({ ...prev, [curr.name]: new FormControl(null, { validators: curr.isRequired ? [Validators.required] : [] }) }), {})
        this.formGroup = this._fb.group(controls);
        this._cdRef.detectChanges();
        this._inputView.setFormGroup(this.formGroup);
      }
    });
  }
}
