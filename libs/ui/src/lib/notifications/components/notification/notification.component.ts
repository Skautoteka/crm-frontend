import { ChangeDetectionStrategy, Component, ComponentRef, computed, effect, HostListener, inject, input, ViewEncapsulation } from "@angular/core";
import { ClassBinder } from "@skautoteka-frontend/common";
import { IconComponent } from "../../../icon";

@Component({
  standalone: true,
  selector: 'skt-ui-notification',
  templateUrl: 'notification.component.html',
  styleUrl: 'notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [IconComponent]
})
export class NotificationComponent {
  @HostListener('click') public onClick(): void {
    this.ref().destroy();
  }

  @HostListener('mouseenter') public onMouseEnter(): void {
    if(this._timeoutRef) {
      clearTimeout(this._timeoutRef);
    }
  }

  @HostListener('mouseleave') public onMouseLeave(): void {
    this._setDestroyTimeout();
  }

  public type = input.required<'success' | 'failure'>();
  public title = input.required<string>();
  public ref = input.required<ComponentRef<NotificationComponent>>();

  public message = input<string>();

  public iconName = computed(() => {
    return this.type() === 'success' ? 'info' : 'info';
  })

  private _classBinder = inject(ClassBinder);

  private _DESTROY_TIME = 3000;
  private _timeoutRef: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this._classBinder.bind('skt-ui-notification');

    effect(() => {
      const type = this.type();
      this._classBinder.bind('skt-ui-notification--' + type);
    })

    this._setDestroyTimeout();
  }

  private _setDestroyTimeout(): void {
    this._timeoutRef = setTimeout(() => {
      this.ref().destroy();
    }, this._DESTROY_TIME);
  }
}
