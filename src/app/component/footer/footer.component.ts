import { Component, OnInit } from '@angular/core';
import { Filter, FilterButton } from 'src/app/models/filtering.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  filterButtons: FilterButton[] = [
    { type: Filter.All, label: 'All', isActived: true },
    { type: Filter.Active, label: 'Active', isActived: false },
    { type: Filter.Completed, label: 'Compeleted', isActived: false }
  ]
  length = 0;

  constructor() { }

  ngOnInit() {
  }

}
