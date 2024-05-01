import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TabsService {
  private activeTab$ = new BehaviorSubject<string | null>(null);

  get activeId$(): Observable<string | null> {
    return this.activeTab$;
  }

  public setActiveTab(id: string | null): void {
    this.activeTab$.next(id);
  }
}
