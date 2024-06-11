import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
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
})
export class InputContainerComponent implements AfterViewInit {
  @ViewChild('inputContainer', { read: ViewContainerRef })
  inputContainer!: ViewContainerRef;

  @Output() formGroup = new EventEmitter<FormGroup>();
  @Input({ required: true }) config!: InputConfig;

  private _formGroup: FormGroup = new FormGroup({});

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-input-container');
  }

  ngAfterViewInit(): void {
    this._buildInputs();
  }

  private _buildInputs(): void {
    this.config.forEach((input) => this._buildInput(input));
  }

  private _buildInput(input: ISingleInputConfig): void {
    this._formGroup.addControl(input.name, new FormControl());
    this.inputContainer.createComponent(InputComponent);
  }
}
