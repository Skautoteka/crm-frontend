import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  input,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { InputConfig, ISingleInputConfig } from '../../interface/iinput';
import { InputComponent } from '@skautoteka-frontend/ui';

@Component({
  selector: 'skt-ui-input-container',
  styleUrl: './input-container.component.scss',
  templateUrl: './input-container.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule, CommonModule, NgIf],
  providers: [ClassBinder],
})
export class InputContainerComponent {
  @ViewChild('inputContainer', { read: ViewContainerRef })
  inputContainer!: ViewContainerRef;

  @Output() formGroup = new EventEmitter<FormGroup>();
  public config = input<InputConfig | null>(null);

  private _formGroup: FormGroup = new FormGroup({});

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-input-container');
    this._buildInputs();
  }

  private _buildInputs(): void {
    effect(() => {
      const config = this.config();
      if (config) {
        config.forEach((input) => this._buildInput(input));
      }
    });
  }

  private _buildInput(input: ISingleInputConfig): void {
    this._formGroup.addControl(input.name, new FormControl());
    this._createInputComponent(input);
  }

  private _createInputComponent(input: ISingleInputConfig): void {
    const { isRequired, placeholder, label } = input;
    const ref = this.inputContainer.createComponent(InputComponent);
    ref.setInput('placeholder', placeholder);
    ref.setInput('label', label);
    ref.setInput('isRequired', isRequired);
    ref.changeDetectorRef.detectChanges();
  }
}
