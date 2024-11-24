import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from "@angular/core";
import { ClassBinder } from "@skautoteka-frontend/common";
import { ButtonComponent, IconComponent, SimpleButtonComponent } from "@skautoteka-frontend/ui";

@Component({
  selector: 'skt-analysis-create',
  templateUrl: 'analysis-create.component.html',
  styleUrl: 'analysis-create.component.scss',
  standalone: true,
  imports: [ButtonComponent, SimpleButtonComponent, IconComponent],
  providers: [ClassBinder],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AnalysisCreateComponent {
  public step = signal(0);
  public type = signal<'note' | 'report' | null>(null);

  get lastStep(): number {
    return 1;
  }

  constructor(classBinder: ClassBinder) {
    classBinder.bind('skt-analysis-create');
  }

  public onBoxClick(type: 'note' | 'report'): void {
    this.type.set(type);
  }

  public onNextStepClick(): void {
    if(!this.type()) {
      return;
    }

    if(this.step() === this.lastStep) {
      console.log('wysylamy');
      return;
    }

    this.step.set(this.step() + 1);
  }

  public onPreviosStepClick(): void {
    this.step.set(this.step() - 1);
  }
}
