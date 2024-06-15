import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  SideContentHeaderComponent,
  SideContentComponent,
  SidenavMenuComponent,
  SideContentheaderActionsComponent,
  ButtonComponent,
  ActionsConfig,
  SideContentSectionComponent,
  SideContentSectionHeaderComponent,
} from '@skautoteka-frontend/ui';
import { TasksContentComponent } from '../tasks-content/tasks-content.component';
import { TasksCreateComponent } from '../tasks-create/tasks-create.component';

@Component({
  standalone: true,
  selector: 'skt-tasks',
  styleUrl: './tasks.component.scss',
  templateUrl: 'tasks.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SidenavMenuComponent,
    TasksContentComponent,
    SideContentHeaderComponent,
    SideContentheaderActionsComponent,
    SideContentComponent,
    SideContentSectionComponent,
    SideContentSectionHeaderComponent,
    TasksBasicInfoComponent,
    ButtonComponent,
    TasksTeamsComponent,
    TasksReportsComponent
  ],
})
export class TasksComponent {
  public actionsConfig: ActionsConfig[] = [{ type: 'DELETE', text: 'Usuń raport' }]

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-tasks');
  }

  public onAddNewClick(): void {
    this._modal.createModal(TasksCreateComponent, {
      header: 'Dodaj zadanie',
      subHeader:
        'Wypełnij wszystkie wymagane informacje o zadaniu i zapisz zmiany',
    });
  }
}
