import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { ClassBinder, DeviceService } from '@skautoteka-frontend/common';
import { DashboardUserActionsComponent } from '../dashboard-user-actions/dashboard-user-actions.component';
import { AsyncPipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { AuthStore } from '../../../auth/store/auth.store';
import { HttpClient } from '@angular/common/http';
import { IconComponent, LoaderComponent, NotificationsService } from '@skautoteka-frontend/ui';
import { catchError, NEVER } from 'rxjs';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

@Component({
  standalone: true,
  selector: 'skt-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DashboardUserActionsComponent,
    AsyncPipe,
    TitleCasePipe,
    NgOptimizedImage,
    IconComponent,
    LoaderComponent,
    UserAvatarComponent
  ]
})
export class DashboardUserComponent {
  public authStore = inject(AuthStore);
  public showAvatar = signal(true);

  private _http = inject(HttpClient);
  private _notification = inject(NotificationsService);

  private _fileUpload = viewChild.required<ElementRef>('fileUpload');
  private _file: File | null = null;

  constructor(classBinder: ClassBinder, public device: DeviceService) {
    classBinder.bind('skt-dashboard-user');
  }

  public onClick(): void {
    this._fileUpload().nativeElement.click();
  }

  public onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this._file = file;
    }

    setTimeout(() => {
      this._upload();
    }, 250);
  }

  private _upload(): void {
    const user = this.authStore.user();

    if (!this._file || !user) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this._file, this._file.name);

    this._http
      .post<void>('api/user/image/' + user.id, formData)
      .pipe(
        catchError(() => {
          this._notification.error('Nie udało się dodać zdjęcia', 'W razie problemów skontaktuj się z administratorem');
          return NEVER;
        })
      )
      .subscribe({
        next: () => window.location.reload()
      });
  }
}
