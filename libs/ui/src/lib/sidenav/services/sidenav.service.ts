import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SidenavElement } from '../interfaces';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private _activeElement$: Subject<SidenavElement> = new Subject();
  public activeElement$ = this._activeElement$.asObservable();

  constructor(private router: Router) {}

  public setActiveElement(element: SidenavElement): void {
    this._activeElement$.next(element);
    this.router.navigate(['/', 'dashboard', element.route]);
  }
}
