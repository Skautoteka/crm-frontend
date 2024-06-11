import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InputConfig } from '@skautoteka-frontend/ui';

@Injectable({ providedIn: 'root' })
export class TasksHttpService {
  constructor(private http: HttpClient) {}

  /**
   * Gets create fields for tasks model.
   */
  public getCreateFieldsConfig$(): Observable<InputConfig> {
    return this.http.get<InputConfig>('api/tasks/create-fields');
  }
}
