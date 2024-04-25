import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  get isMobile$(): Observable<boolean> {
    return this.breakpointObserver
      .observe(['(max-width: 850px)'])
      .pipe(map((state) => state.matches));
  }

  constructor(private breakpointObserver: BreakpointObserver) {}
}
