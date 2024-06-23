import { Injectable } from '@angular/core';
import { Report } from '../interfaces/report';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { InputConfig } from '@skautoteka-frontend/ui';
import { ReportsHttpService } from './reports-http.service';

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private _allReports: Report[] = [];
  private _allReports$ = new BehaviorSubject<Report[]>([]);
  private _activeReport: Report | null = null;
  private _activeReport$ = new BehaviorSubject<Report | null>(null);

  constructor(private _router: Router, private _reportsHttp: ReportsHttpService) {}

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
   * Returns all reports currently in store.
   */
  get allReports$(): Observable<Report[]> {
    return this._allReports$;
  }

  /**
   * Retrieves all reports from backend and sets it inside a store.
   *
   * @returns
   */
  public fetchAllReports(): void {
    this._reportsHttp.getAllReports$().subscribe(teams => this._setReports(teams));
  }

  /**
   * Sets active task.
   *
   * @param id
   */
  public setActiveReport(id: string | null): void {
    this._activeReport = this._allReports.find(report => report.id === id) || null;
    this._activeReport$.next(this._activeReport);
    if (this._activeReport) {
      this._router.navigate(['dashboard', 'reports', 'details', this._activeReport.id || '']);
    } else {
      this._router.navigate(['dashboard', 'reports']);
    }
  }

  /**
   * Gets create fields for tasks model.
   */
  public getCreateFieldsConfig$(): Observable<InputConfig> {
    return this._reportsHttp.getCreateFieldsConfig$();
  }

  private _deleteTask(id: string): void {
    this._allReports = this._allReports.filter(report => report.id !== id);
  }

  private _setReports(reports: Report[]): void {
    this._allReports = reports;
    this._allReports$.next(this._allReports);
  }
}
