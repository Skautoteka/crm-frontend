import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, input, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { InputConfig, ISingleInputConfig } from '../../interface';
import { InputComponent } from '../input/input.component';

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
export class InputContainerComponent {
  public config = input<InputConfig | null>(null);
  public formGroup!: FormGroup;

  constructor(classBinder: ClassBinder, private _fb: FormBuilder, private _cdRef: ChangeDetectorRef) {
    classBinder.bind('skt-ui-input-container');
    this._buildInputs();
  }

  get inputsArr(): FormArray {
    return this.formGroup.controls['inputs'] as FormArray;
  }

  public getInputName(input: AbstractControl): string {
    debugger;
    console.log(input, 'tutej');
    return '';
  }

  private _buildInputs(): void {
    this.formGroup = this._fb.group({
      inputs: this._fb.array([])
    });

    effect(() => {
      const config = this.config();
      if (config) {
        config.forEach(input => this._buildInput(input));
      }
    });
  }

  private _buildInput(input: ISingleInputConfig): void {
    this.formGroup.addControl(input.name, new FormControl());
    this.inputsArr.push(new FormControl());
    this._cdRef.detectChanges();
  }
}
