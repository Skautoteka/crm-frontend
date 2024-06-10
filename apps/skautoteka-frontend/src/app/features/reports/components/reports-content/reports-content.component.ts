import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '@skautoteka-frontend/common';
import {
  LabelComponent,
  ListCardComponent,
  TabComponent,
  TabsComponent,
} from '@skautoteka-frontend/ui';
import { ReportsService } from '../../services';
import { TableComponent } from '../../../../../../../../libs/ui/src/lib/table/index';
import { TableColumn } from '../../../../../../../../libs/ui/src/lib/table';

@Component({
  standalone: true,
  selector: 'skt-reports-content',
  styleUrl: './reports-content.component.scss',
  templateUrl: 'reports-content.component.html',
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabsComponent,
    TabComponent,
    ListCardComponent,
    LabelComponent,
    TableComponent,
  ],
})
export class ReportsContentComponent {
  constructor(classBinder: ClassBinder, public reportsService: ReportsService) {
    classBinder.bind('skt-reports-content');
  }

  tableData = [
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Janusz Kowalczyk',
      finished: true,
      rating: 4.5,
      data: new Date('2024-01-31'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Cristiano Ronaldo',
      finished: false,
      rating: null,
      data: new Date('2024-02-28'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Janusz Janosz',
      finished: true,
      rating: 4.2,
      data: new Date('2024-03-15'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Leo Messi',
      finished: true,
      rating: 4.9,
      data: new Date('2024-04-20'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
    {
      imageUrl: 'assets/images/placeholder.png',
      name: 'Erling Haaland',
      finished: false,
      rating: null,
      data: new Date('2024-05-01'),
    },
  ];

  tableColumns: TableColumn[] = [
    { key: 'imageUrl', label: '', type: 'img' },
    { key: 'name', label: 'Nazwa raportu', type: 'string' },
    { key: 'finished', label: 'Status raportu', type: 'boolean' },
    { key: 'rating', label: 'Ogólna ocena', type: 'number' },
    { key: 'data', label: 'Data utworzenia', type: 'date' },
  ];
}
