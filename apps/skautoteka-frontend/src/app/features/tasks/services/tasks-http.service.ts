import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InputConfig } from '@skautoteka-frontend/ui';
import { Task } from '../interfaces/task';
import { IModelResponse } from '@skautoteka-frontend/common';
import { Report } from '../../reports/interfaces/report';
import { Note } from '../../notes/interfaces/note';

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
  public addTask$(task: Task): Observable<IModelResponse<Task>> {
    return this.http.post<IModelResponse<Task>>('api/task', task);
  }

  /**
   * Retrieves all reports based on task id from the database.
   *
   * @returns
   */
  public getAssignedReports$(id: string): Observable<Report[]> {
    return this.http.get<Report[]>(`api/report/allByTaskId/${id}`);
  }

  /**
   * Retrieves all notes based on task id from the database.
   *
   * @returns
   */
  public getAssignedNotes$(id: string): Observable<Note[]> {
    return this.http.get<Note[]>(`api/note/allByTaskId/${id}`);
  }

  /**
   * Removes the task from the database.
   *
   * @param id
   * @returns
   */
  public removeTask$(id: string): Observable<void> {
    return this.http.delete<void>('api/task/' + id.toString());
  }
}
