import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { InputConfig } from "@skautoteka-frontend/ui";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AnalysisHttpService {
  private _http = inject(HttpClient);

  /**
   * Gets create fields for report
   *
   * @returns
   */
  public getCreateFieldsReportConfig$(): Observable<InputConfig> {
    return this._http.get<InputConfig>('api/analysis/create-fields', { params: { type: 'report' } })
  }

  /**
   * Gets create fields for note
   *
   * @returns
   */
  public getCreateFieldsNoteConfig$(): Observable<InputConfig> {
    return this._http.get<InputConfig>('api/analysis/create-fields', { params: { type: 'note' } })
  }
}
