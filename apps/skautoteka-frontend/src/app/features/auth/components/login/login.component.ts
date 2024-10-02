import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from "@angular/core";
import { ClassBinder } from "@skautoteka-frontend/common";
import { AuthStore } from "../../store/auth.store";
import { ButtonComponent, InputComponent, InputPasswordComponent } from "@skautoteka-frontend/ui";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  standalone: true,
  selector: 'skt-login',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
  imports: [
    InputComponent,
    InputPasswordComponent,
    ReactiveFormsModule,
    ButtonComponent
  ]
})
export class LoginComponent {
  private _classBinder = inject(ClassBinder);
  private _formBuilder = inject(FormBuilder);

  public authStore = inject(AuthStore);

  public loginGroup = this._formBuilder.group({
    email: this._formBuilder.control('', { validators: [Validators.required, Validators.email] }),
    password: this._formBuilder.control('', { validators: [Validators.required] })
  })

  constructor() {
    this._classBinder.bind('skt-login');
  }

  public onLogin(): void {
    const { email, password } = this.loginGroup.value;

    if(!email || !password) {
      return;
    }

    this.authStore.login({ email, password });
  }
}
