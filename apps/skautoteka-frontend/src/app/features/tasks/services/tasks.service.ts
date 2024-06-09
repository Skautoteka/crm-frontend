import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TasksService {
  private _allTasks: Task[] = [];
  private _activeTask: Task | null = null;
  private _activeTask$ = new BehaviorSubject<Task | null>(null);

  constructor(private _router: Router) {}

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
  public getAllTasks(): Task[] {
    this._allTasks = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    return this._allTasks;
  }

  /**
   * Sets active task.
   *
   * @param task
   */
  public setActiveTask(id: number | null): void {
    this._activeTask = this._allTasks.find((task) => task.id === id) || null;
    this._activeTask$.next(this._activeTask);
    this._router.navigate([
      'dashboard',
      'tasks',
      'details',
      this._activeTask ? this._activeTask.id : '',
    ]);
  }
}
