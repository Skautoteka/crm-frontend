import { Injectable } from '@angular/core';
import { Report } from '../interfaces/report';

@Injectable()
export class ReportsService {
  private _allReports: Report[] = [];
  private _activeReport: Report | null = null;

  /**
   * Returns an active report on the report view.
   */
  get activeReport(): Report | null {
    return this._activeReport;
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
   * Sets active report.
   *
   * @param report
   */
  public setActiveReport(id: number): void {
    this._activeReport =
      this._allReports.find((report) => report.id === id) || null;
  }
}
