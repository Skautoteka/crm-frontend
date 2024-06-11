import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  ButtonComponent,
  InputComponent,
  InputContainerComponent,
} from '@skautoteka-frontend/ui';
import { InputConfig } from '../../../../../../../../libs/ui/src/lib/input/interface/iinput';

@Component({
  standalone: true,
  selector: 'skt-tasks-create',
  styleUrl: './tasks-create.component.scss',
  templateUrl: 'tasks-create.component.html',
  providers: [ClassBinder],
  imports: [InputComponent, ButtonComponent, InputContainerComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksCreateComponent {
  public inputConfig: InputConfig = [
    {
      name: 'email',
      label: 'Email',
      isRequired: true,
      placeholder: 'Wpisz swój email',
    },
    {
      name: 'firstName',
      label: 'Imię',
      isRequired: false,
      placeholder: 'Wpisz swoje imię',
    },
    {
      name: 'firstName',
      label: 'Imię',
      isRequired: false,
      placeholder: 'Wpisz swoje imię',
    },
  ];

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks-create');
  }
}
