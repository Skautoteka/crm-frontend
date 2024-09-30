import { patchState, signalStoreFeature, type, withMethods } from "@ngrx/signals"
import { ReportsStoreState } from "./reports.store"
import { inject } from "@angular/core";
import { ReportsHttpService } from "../services/reports-http.service";
import { Router } from "@angular/router";
import { ModalService } from "@skautoteka-frontend/ui";
import { pipe, switchMap, tap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";
import { Report } from "../interfaces/report";

export const withReportsMethods = () => {
  return signalStoreFeature({ state: type<ReportsStoreState>() }, withMethods(store => {
    const httpService = inject(ReportsHttpService);
    const router = inject(Router);
    const modal = inject(ModalService);

    /**
     * Gets all reports from the database.
     */
    const getReports = rxMethod<void>(pipe(
      tap(() => patchState(store, { isLoading: true })),
      switchMap(() => httpService.getAllReports$().pipe(tapResponse({
        next: reports => patchState(store, { reports }),
        error: () => null,
        finalize: () => patchState(store, { isLoading: false })
      })))
    ))

    /**
     * Private method to filter reports.
     *
     * @param id
     * @returns
     */
    const _filterReport = (id: string | null): Report[] => store.reports().filter(report => report.id !== id);

    /**
     * A private method that is used to find a report from the store.
     *
     * @param id
     * @returns
     */
    const _findReport = (id: string | null): Report | null => store.reports().find(report => report.id === id) || null;

    /**
     * Removes report from the database and from the store.
     */
    const removeReport = rxMethod<string>(pipe(
      tap(() => patchState(store, { isLoading: true })),
      switchMap(id => httpService.removeReport$(id).pipe(tapResponse({
        next: () => patchState(store, { reports: _filterReport(id) }),
        error: () => null
      })))
    ))

    /**
     * Adds a report to the store and to the database.
     */
    const addReport = rxMethod<Report>(pipe(
      switchMap(player => httpService.addReport$(player).pipe(tapResponse({
        next: ({ added }) => patchState(store, { reports: [...store.reports(), added] }),
        error: () => null,
        finalize: () => modal.closeAll()
      })))
    ))

    /**
     * Fetches the create fields from backend and saves it to the store.
     */
    const fetchFields = rxMethod<void>(pipe(
      switchMap(() => httpService.getCreateFieldsConfig$().pipe(tapResponse({
        next: (createFields) => patchState(store, { createFields }),
        error: () => null
      })))
    ));

    /**
     * Sets active report.
     *
     * @param id
     */
    const setActiveReport = (id: string | null) => {
      const activeReport = _findReport(id);

      if (activeReport) {
        router.navigate(['dashboard', 'reports', 'details', activeReport.id]);
      } else {
        router.navigate(['dashboard', 'reports']);
      }

      patchState(store, { activeReport });
    }

    return {
      getReports,
      removeReport,
      addReport,
      fetchFields,
      setActiveReport
    }
  }))
}
