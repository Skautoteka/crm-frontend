import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from "@angular/core";
import {ClassBinder} from "@skautoteka-frontend/common";
import {NgClass} from "@angular/common";

@Component({
  selector: 'skt-ui-icon',
  styleUrl: './icon.component.scss',
  templateUrl: './icon.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgClass
  ],
  providers: [ClassBinder]
})
export class IconComponent {
  @Input({ required: true }) iconName = '';

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-icon')
  }
}
