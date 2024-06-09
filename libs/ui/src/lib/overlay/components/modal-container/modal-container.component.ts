import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { ComponentType } from '@angular/cdk/overlay';

@Component({
  standalone: true,
  selector: 'skt-ui-modal-container',
  styleUrl: './modal-container.component.scss',
  templateUrl: 'modal-container.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContainerComponent<T> implements AfterViewInit {
  @ViewChild('mountPoint', { read: ViewContainerRef })
  viewRef!: ViewContainerRef;
  @Input() componentType!: ComponentType<T>;

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-ui-modal-container');
  }

  ngAfterViewInit(): void {
    this.viewRef.createComponent(this.componentType);
  }
}
