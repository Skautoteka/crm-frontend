import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  output,
  ViewEncapsulation
} from '@angular/core';
import { ClassBinder, DeviceService } from '@skautoteka-frontend/common';
import { SidenavMenuComponent } from '../sidenav-menu/sidenav-menu.component';
import { SidenavElement } from '../../interfaces';
import { AsyncPipe } from '@angular/common';
import { SidenavService } from '../../services/sidenav.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'skt-ui-sidenav',
  styleUrl: './sidenav.component.scss',
  templateUrl: './sidenav.component.html',
  standalone: true,
  imports: [SidenavMenuComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder]
})
export class SidenavComponent {
  @Input({ required: true }) elements: SidenavElement[] = [];

  public logoutClicked = output<void>();

  private _isVisible = false;
  private _sidenav = inject(SidenavService);

  constructor(classBinder: ClassBinder, public device: DeviceService, private cdRef: ChangeDetectorRef) {
    classBinder.bind('skt-ui-sidenav');
    this._hideOnRouteChange();
  }

  get isMenuVisible(): boolean {
    return this._isVisible;
  }

  public toggleVisible(): void {
    this._isVisible = !this._isVisible;
    this.cdRef.detectChanges();
  }

  public onLogoutClicked(): void {
    this.logoutClicked.emit();
  }

  private _hideOnRouteChange(): void {
    this._sidenav.activeElement$.pipe(takeUntilDestroyed()).subscribe(() => {
      this._isVisible = false;
      this.cdRef.detectChanges();
    });
  }
}
