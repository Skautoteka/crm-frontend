import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { SidenavMenuComponent } from '../sidenav-menu/sidenav-menu.component';
import { SidenavElement } from '../../interfaces';
import { DeviceService } from '../../../../../../common/src/lib/services/device.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'skt-ui-sidenav',
  styleUrl: './sidenav.component.scss',
  templateUrl: './sidenav.component.html',
  standalone: true,
  imports: [SidenavMenuComponent, NgIf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class SidenavComponent {
  @Input({ required: true }) elements: SidenavElement[] = [];

  private isVisible = true;

  constructor(
    classBinder: ClassBinder,
    public device: DeviceService,
    private cdRef: ChangeDetectorRef
  ) {
    classBinder.bind('skt-ui-sidenav');
  }

  get isMenuVisible(): boolean {
    return this.isVisible;
  }

  public toggleVisible(): void {
    this.isVisible = !this.isVisible;
    this.cdRef.detectChanges();
  }
}
