import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import { AnalysisStore } from '../../store/analysis.store';
import { PredicateFilterComponent } from '../predicate-filter/predicate-filter.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputSearchComponent } from '@skautoteka-frontend/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'skt-analysis-note-create',
  templateUrl: 'analysis-note-create.component.html',
  styleUrl: 'analysis-note-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
  imports: [PredicateFilterComponent, ReactiveFormsModule, InputSearchComponent]
})
export class NoteCreateComponent {
  public analysis = inject(AnalysisStore);

  public teamControl = new FormControl('');

  private _classBinder = inject(ClassBinder);

  constructor() {
    this._classBinder.bind('skt-analysis-note-create');
    this.analysis.getNoteFilters();

    this.teamControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => this.analysis.setNoteTeamId(value));
  }
}
