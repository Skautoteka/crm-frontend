import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InputConfig } from '@skautoteka-frontend/ui';
import { Note } from '../interfaces/note';
import { IModelResponse } from '@skautoteka-frontend/common';

@Injectable({ providedIn: 'root' })
export class NotesHttpService {
  constructor(private http: HttpClient) {}

  /**
   * Gets create fields for note model.
   */
  public getCreateFieldsConfig$(): Observable<InputConfig> {
    return this.http.get<InputConfig>('api/note/create-fields');
  }

  /**
   * Gets create fields for note model.
   */
  public getNotesFieldsConfig$(id: string): Observable<InputConfig> {
    return this.http.get<InputConfig>('api/note/get-fields/' + id);
  }

  /**
   * Retrieves all notes from the database.
   *
   * @returns
   */
  public getAllNotes$(): Observable<Note[]> {
    return this.http.get<Note[]>('api/note/all');
  }

  /**
   * Removes task from database.
   *
   * @param id
   * @returns
   */
  public removeNote$(id: string): Observable<void> {
    return this.http.delete<void>('api/note/' + id);
  }

  /**
   * Post http request that adds a new note.
   *
   * @param note
   */
  public addNote$(note: Note): Observable<IModelResponse<Note>> {
    return this.http.post<IModelResponse<Note>>('api/note/add', { ...note });
  }

  /**
   * Post http request that adds a new note.
   *
   * @param note
   */
  public updateNote$(note: Note): Observable<IModelResponse<Note>> {
    return this.http.post<IModelResponse<Note>>('api/note/update', { ...note });
  }
}
