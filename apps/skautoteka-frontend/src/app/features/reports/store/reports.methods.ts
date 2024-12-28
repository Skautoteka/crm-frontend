import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { ReportsStoreState } from './reports.store';
import { inject } from '@angular/core';
import { ReportsHttpService } from '../services/reports-http.service';
import { Router } from '@angular/router';
import { ModalService, NotificationsService } from '@skautoteka-frontend/ui';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Report } from '../interfaces/report';

export const withReportsMethods = () => {
  return signalStoreFeature(
    { state: type<ReportsStoreState>() },
    withMethods(store => {
      const httpService = inject(ReportsHttpService);
      const router = inject(Router);
      const modal = inject(ModalService);
      const notification = inject(NotificationsService);

      /**
       * Gets all reports from the database.
       */
      const getReports = rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            httpService.getAllReports$().pipe(
              tapResponse({
                next: reports => patchState(store, { reports }),
                error: () => {
                  notification.error('Brak dostepu do rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => patchState(store, { isLoading: false })
              })
            )
          )
        )
      );

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
      const _findReport = (id: string | null): Report | null =>
        store.reports().find(report => report.id === id) || null;

      /**
       * Removes report from the database and from the store.
       */
      const removeReport = rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(id =>
            httpService.removeReport$(id).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { reports: _filterReport(id) });
                  notification.success('Poprawnie usunieto raport');
                },
                error: () => {
                  notification.error('Brak dostepu do usuwania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => setActiveReport(null)
              })
            )
          )
        )
      );

      /**
       * Adds a report to the store and to the database.
       */
      const addReport = rxMethod<Report>(
        pipe(
          switchMap(report =>
            httpService.addReport$(report).pipe(
              tapResponse({
                next: ({ added }) => {
                  patchState(store, { reports: [...store.reports(), added] });
                  notification.success('Poprawnie dodano raport');
                },
                error: () => {
                  notification.error('Brak dostepu do dodawania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => modal.closeAll()
              })
            )
          )
        )
      );

      /**
       * Updates a report to the store and to the database.
       */
      const updateReport = rxMethod<Report>(
        pipe(
          switchMap(report =>
            httpService.updateReport$(report).pipe(
              tapResponse({
                next: ({ updated }) => {
                  patchState(store, {
                    reports: store.reports().map(r => (r.id === updated.id ? updated : r))
                  });
                  notification.success('Poprawnie zaktualizowano raport');
                },
                error: () => {
                  notification.error('Brak dostepu do aktualizacji rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                },
                finalize: () => modal.closeAll()
              })
            )
          )
        )
      );

      /**
       * Fetches the create fields from backend and saves it to the store.
       */
      const fetchFields = rxMethod<void>(
        pipe(
          switchMap(() =>
            httpService.getCreateFieldsConfig$().pipe(
              tapResponse({
                next: createFields => patchState(store, { createFields }),
                error: () => {
                  notification.error('Brak dostepu do dodawania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                }
              })
            )
          )
        )
      );

      /**
       * Fetches the create fields from backend and saves it to the store.
       */
      const fetchReportFields = rxMethod<string>(
        pipe(
          switchMap(id =>
            httpService.getReportsFieldsConfig$(id).pipe(
              tapResponse({
                next: reportFields => patchState(store, { reportFields }),
                error: () => {
                  notification.error('Brak dostepu do dodawania rekordow', 'Skontaktuj sie z administratorem');
                  modal.closeAll();
                }
              })
            )
          )
        )
      );

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
      };

      /**
       * Sets active report.
       *
       * @param id
       */
      const setSelectedReport = (report: Report | null) => {
        patchState(store, { selectedReport: report });
      };

      return {
        getReports,
        removeReport,
        addReport,
        updateReport,
        fetchFields,
        fetchReportFields,
        setActiveReport,
        setSelectedReport
      };
    })
  );
};
