import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from "@angular/core";
import { ClassBinder } from "@skautoteka-frontend/common";

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
  private _classBinder = inject(ClassBinder);

  constructor() {
    this._classBinder.bind('skt-login')
  }
}
