import { Component, OnInit, OnDestroy } from '@angular/core';
import { Filter, FilterButton } from 'src/app/models/filtering.model';
import { TodoService } from 'src/app/services/todo.service';
import { Observable, Subject, Subscriber } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  filterButtons: FilterButton[] = [
    { type: Filter.All, label: 'All', isActived: true },
    { type: Filter.Active, label: 'Active', isActived: false },
    { type: Filter.Completed, label: 'Compeleted', isActived: false }
  ];
  length = 0;
  hasCompleted$: Observable<boolean>;
  destroy$: Subject<null> = new Subject<null>();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.hasCompleted$ = this.todoService.Todos$.pipe(
      map(todos => todos.some(t => t.isCompleted)),
      takeUntil(this.destroy$)
    );

    this.todoService.length$.pipe(
      takeUntil(this.destroy$)).subscribe(
        length => {
          this.length = length;
        }
      );
  }
  filter(type: Filter) {
    this.setActivedFilterBtn(type);
    this.todoService.filterTodos(type);
  }

  private setActivedFilterBtn(type: Filter) {
    this.filterButtons.forEach(btn => {
      btn.isActived = btn.type === type;
    });
  }
  clearCompleted() {
    this.todoService.clearCompleted();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

  }
}
