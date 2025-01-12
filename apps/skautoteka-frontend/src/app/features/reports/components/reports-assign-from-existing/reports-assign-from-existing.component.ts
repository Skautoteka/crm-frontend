import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReportsStore } from '../../store/reports.store';
import { DatePipe } from '@angular/common';
import { TasksStore } from '../../../tasks/store/tasks.store';
import { DialogService, ModalService, NotificationsService } from '@skautoteka-frontend/ui';
import { ReportsCreateFromTaskComponent } from '../reports-create-from-task/reports-create-from-task.component';

@Component({
  standalone: true,
  selector: 'skt-reports-assign-from-existing',
  styleUrl: 'reports-assign-from-existing.component.scss',
  templateUrl: 'reports-assign-from-existing.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
  imports: [DatePipe]
})
export class ReportsAssignFromExistingComponent {
  public reports = inject(ReportsStore);
  public tasks = inject(TasksStore);

  private _dialog = inject(DialogService);
  private _notification = inject(NotificationsService);
  private _modal = inject(ModalService);

  public unassigned = toSignal(this.reports.getUnassigned$());

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-reports-assign-from-existing');
  }

  public onItemClick(id: string): void {
    const task = this.tasks.activeTask();

    if (!task) {
      return;
    }

    this._modal.closeAll();

    const ref = this._dialog.createPrompt({
      message: 'Czy chcesz przypisać ten raport do zadania?',
      auxiliaryMessage: 'Wciśnij tak, jeżeli chcesz przypisać rekord do zadania',
      confirmInfo: {
        message: 'Tak',
        callback: () => {
          this.reports.assignTask$(task.id, id).subscribe({
            next: () => {
              this._notification.success('Sukces', 'Udało się przypisać raport');
              ref.close();
            },
            error: () => {
              this._notification.error('Wystąpił błąd', 'Nie udało się przypisać raportu');
              ref.close();
            }
          });
        }
      },
      cancelInfo: {
        message: 'Wróć do wyboru',
        callback: () => {
          ref.close();
          this._modal.createModal(ReportsCreateFromTaskComponent, {
            header: 'Dodaj raport',
            subHeader: 'Wypełnij wszystkie wymagane informacje aby dodać raport'
          });
        }
      }
    });
  }
}
