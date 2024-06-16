import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InputConfig } from '@skautoteka-frontend/ui';
import { Task } from '../interfaces/task';

@Injectable({ providedIn: 'root' })
export class TasksHttpService {
  constructor(private http: HttpClient) {}

  /**
   * Gets create fields for tasks model.
   */
  public getCreateFieldsConfig$(): Observable<InputConfig> {
    return this.http.get<InputConfig>('api/task/create-fields');
  }

  /**
   * Retrieves all tasks from the database.
   *
   * @returns
   */
  public getAllTasks$(): Observable<Task[]> {
    return this.http.get<Task[]>('api/task/all');
  }

  /**
   * Adds a new task to the database.
   *
   * @returns
   */
  public addTask(): Observable<void> {
    return this.http.post<void>('api/task', {});
  }

  /**
   * Removes the task from the database.
   *
   * @param id
   * @returns
   */
  public removeTask(id: number): Observable<void> {
    return this.http.delete<void>('api/task/' + id.toString());
  }
}