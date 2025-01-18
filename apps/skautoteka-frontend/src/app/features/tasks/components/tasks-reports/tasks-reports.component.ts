import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ClassBinder } from '@skautoteka-frontend/common';
import { DialogService, ListCardComponent, ModalService, NotificationsService } from '@skautoteka-frontend/ui';
import { TasksStore } from '../../store/tasks.store';
import { Report } from '../../../reports/interfaces/report';
import { ReportsStore } from '../../../reports/store/reports.store';
import { ReportsCreateFullComponent } from '../../../reports/components/reports-create-full/reports-create-full.component';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'skt-tasks-reports',
  styleUrl: './tasks-reports.component.scss',
  templateUrl: 'tasks-reports.component.html',
  providers: [ClassBinder, DatePipe],
  imports: [ListCardComponent, CommonModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksReportsComponent {
  public tasksStore = inject(TasksStore);
  public reportStore = inject(ReportsStore);

  public assignedReports = this.tasksStore.assignedReports;

  private _dialog = inject(DialogService);
  private _http = inject(HttpClient);
  private _notification = inject(NotificationsService);

  constructor(classBinder: ClassBinder, private _modal: ModalService, private datePipe: DatePipe) {
    classBinder.bind('skt-tasks-reports');
  }

  public openReport(report: Report): void {
    const formattedDate = this.datePipe.transform(report.createdAt, 'dd-MM-yyyy');
    this.reportStore.setSelectedReport(report);

    this._modal.createModal(ReportsCreateFullComponent, {
      header: `Raport: ${report.name}`,
      subHeader: `Utworzony: ${formattedDate}`
    });
  }

  public onPdfClicked(id: string): void {
    this._http.get('api/report/pdf/' + id, { responseType: 'blob' }).subscribe({
      next: res => {
        const url = URL.createObjectURL(res);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${id}.pdf`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
        this._notification.success('Sukces', 'Udał się wygenerować plik PDF');
      },
      error: () => {
        this._notification.error('Wystąpił błąd', 'Wystąpił błąd podczas pobierania pliku PDF');
      }
    });
  }

  public onTrashClicked(id: string): void {
    const ref = this._dialog.createPrompt({
      message: 'Czy na pewno chcesz usunąć rekord?',
      auxiliaryMessage: 'Usunięcie skutkuje całkowitym usunięciem danych',
      confirmInfo: {
        message: 'Tak, usuwam',
        callback: () => {
          this.reportStore.removeAuxilliaryReport(id);
          ref.close();
        }
      },
      cancelInfo: {
        message: 'Nie usuwaj',
        callback: () => ref.close()
      }
    });
  }

  public onUnassignClicked(id: string): void {
    const ref = this._dialog.createPrompt({
      message: 'Czy na pewno chcesz usunąć przypisanie raportu do zadania?',
      auxiliaryMessage: 'Usunięcie przypisania raportu do zadania jest przywracalne',
      confirmInfo: {
        message: 'Tak, usuń',
        callback: () => {
          this.reportStore.unassignReport(id);
          ref.close();
        }
      },
      cancelInfo: {
        message: 'Nie usuwaj',
        callback: () => ref.close()
      }
    });
  }
}
