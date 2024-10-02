import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from "@angular/core";
import { ClassBinder } from "@skautoteka-frontend/common";
import { AuthStore } from "../../store/auth.store";

@Component({
  standalone: true,
  selector: 'skt-login',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
})
export class LoginComponent {
  public authStore = inject(AuthStore);

  private _classBinder = inject(ClassBinder);

  constructor() {
    this._classBinder.bind('skt-login');
    this.authStore.login({ email: 'dkowalski.1997@gmail.com', password: 't4jn3h4slo' })
  }
}
