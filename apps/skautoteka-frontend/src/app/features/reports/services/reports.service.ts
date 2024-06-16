import { Injectable } from '@angular/core';
import { Report } from '../interfaces/report';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { InputConfig } from '@skautoteka-frontend/ui';
import { ReportsHttpService } from './reports-http.service';

@Injectable()
export class ReportsService {
  private _allReports: Report[] = [];
  private _activeReport: Report | null = null;
  private _activeReport$ = new BehaviorSubject<Report | null>(null);

  constructor(private _router: Router, private _taskHttp: ReportsHttpService) {}

  /**
   * Returns an active report on the report view.
   */
  get activeReport(): Report | null {
    return this._activeReport;
  }

  /**
   * Returns an active task as observable.
   */
  get activeReport$(): Observable<Report | null> {
    return this._activeReport$;
  }

  /**
   * Retrieves all reports from backend.
   *
   * @returns
   */
  public getAllReports(): Report[] {
    this._allReports = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    return this._allReports;
  }

  /**
   * Sets active task.
   *
   * @param task
   */
  public setActiveReport(id: number | null): void {
    this._activeReport =
      this._allReports.find((task) => task.id === id) || null;
    this._activeReport$.next(this._activeReport);
    this._router.navigate([
      'dashboard',
      'tasks',
      'details',
      this._activeReport ? this._activeReport.id : '',
    ]);
  }

  /**
   * Gets create fields for tasks model.
   */
  public getCreateFieldsConfig$(): Observable<InputConfig> {
    return this._taskHttp.getCreateFieldsConfig$();
  }
}
