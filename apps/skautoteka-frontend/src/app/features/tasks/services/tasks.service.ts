import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { InputConfig } from '@skautoteka-frontend/ui';
import { TasksHttpService } from './tasks-http.service';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private _allTasks: Task[] = [];
  private _allTasks$ = new BehaviorSubject<Task[] | null>(null);
  private _activeTask: Task | null = null;
  private _activeTask$ = new BehaviorSubject<Task | null>(null);

  constructor(private _router: Router, private _taskHttp: TasksHttpService) {
    this._taskHttp.getAllTasks$().subscribe(tasks => this._setAllTasks(tasks));
  }

  /**
   * Returns an active task on the task view.
   */
  get activeTask(): Task | null {
    return this._activeTask;
  }

  /**
   * Returns an active task as observable.
   */
  get activeTask$(): Observable<Task | null> {
    return this._activeTask$;
  }

  /**
   * Retrieves all tasks from backend.
   *
   * @returns
   */
  public getAllTasks$(): Observable<Task[] | null> {
    return this._allTasks$;
  }

  /**
   * Adds a new task.
   */
  public addTask(task: Task): void {
    this._taskHttp.postTask(task).subscribe(task => {
      this._allTasks = [...this._allTasks, { ...task }];
      this._allTasks$.next(this._allTasks);
    });
  }

  /**
   * Sets active task.
   *
   * @param task
   */
  public setActiveTask(id: number | null): void {
    this._activeTask = this._allTasks.find(task => task.id === id) || null;
    this._activeTask$.next(this._activeTask);
    if (this.activeTask) {
      this._router.navigate(['dashboard', 'tasks', 'details', this._activeTask?.id || '']);
    } else {
      this._router.navigate(['dashboard', 'tasks']);
    }
  }

  public removeActiveTask(): void {
    if (!this.activeTask) {
      return;
    }

    const id = this.activeTask.id;
    this._taskHttp.removeTask(id).subscribe();
    this._allTasks = this._allTasks.filter(task => task.id !== id);
    this._allTasks$.next(this._allTasks);
    this.setActiveTask(null);
  }

  /**
   * Gets create fields for tasks model.
   */
  public getCreateFieldsConfig$(): Observable<InputConfig> {
    return this._taskHttp.getCreateFieldsConfig$();
  }

  private _setAllTasks(tasks: Task[]): void {
    this._allTasks = tasks;
    this._allTasks$.next(tasks);
  }
}
