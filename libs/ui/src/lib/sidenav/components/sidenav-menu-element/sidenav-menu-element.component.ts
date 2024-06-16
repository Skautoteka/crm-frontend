import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { SidenavElement } from '../../interfaces';

import { IconComponent } from '../../../icon';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'skt-ui-sidenav-menu-element',
  styleUrl: './sidenav-menu-element.component.scss',
  templateUrl: './sidenav-menu-element.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [IconComponent],
  providers: [ClassBinder],
})
export class SidenavMenuElementComponent {
  @Input({ required: true }) element!: SidenavElement;

  @HostListener('click')
  onClick(): void {
    this.sidenav.setActiveElement(this.element);
  }

  public sidenav = inject(SidenavService);

  private get isActive$(): Observable<boolean> {
    return this.router.events.pipe(
      filter((event) => !!(event as any).url),
      map((event) => (event as NavigationEnd).url.includes(this.element.route))
    );
  }

  constructor(private classBinder: ClassBinder, private router: Router) {
    classBinder.bind('skt-ui-sidenav-menu-element');
    this.highlightActive();
  }

  private highlightActive(): void {
    this.isActive$.pipe(takeUntilDestroyed()).subscribe((isActive) => {
      this.classBinder.conditionalBind(
        isActive,
        'skt-ui-sidenav-menu-element--active'
      );
    });
  }
}
