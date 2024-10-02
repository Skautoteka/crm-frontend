import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { ClassBinder } from "@skautoteka-frontend/common";

@Component({
  standalone: true,
  selector: 'skt-ui-loader',
  templateUrl: 'loader.component.html',
  styleUrl: 'loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  providers: [ClassBinder]
})
export class LoaderComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-loader');
  }
}
