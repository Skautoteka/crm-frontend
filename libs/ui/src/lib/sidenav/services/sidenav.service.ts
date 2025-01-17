import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SidenavElement } from '../interfaces';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private _activeElement$: Subject<SidenavElement> = new Subject();
  public activeElement$ = this._activeElement$.asObservable();

  private _active: SidenavElement | null = null;

  constructor(private router: Router) {}

  public setActiveElement(element: SidenavElement): void {
    if (element.route === this._active?.route) {
      return;
    }

    this._activeElement$.next(element);
    this._active = element;
    this.router.navigate(['/', 'dashboard', element.route]);
  }
}
