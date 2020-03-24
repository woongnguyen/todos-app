import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private static readonly TodoStorageKey = 'todos';

  private todos: Todo[];
  private filteredTodos: Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayTodoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private currentFilter: Filter.All;

  Todos$: Observable<Todo[]> = this.displayTodoSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private storageService: LocalStorageService) { }

  fetchFromLocalStorage() {
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
    this.filteredTodos = [...this.todos.map(todo => ({ ...todo }))];
    this.updateTodoData();
  }

  updateToLocalStorage() {
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
    this.filterTodos(this.currentFilter, false);
    this.updateTodoData();
  }

  addTodo(content: string) {
    const date = new Date(Date.now()).getTime();
    const newTodo = new Todo(date, content);
    this.todos.unshift(newTodo);
    this.updateToLocalStorage();
  }

  filterTodos(filter: Filter, isFiltering: boolean = true) {
    switch (filter) {
      case Filter.Active:
        this.filteredTodos = this.todos.filter(todo => !todo.isCompeleted);
        break;
      case Filter.Completed:
        this.filteredTodos = this.todos.filter(todo => todo.isCompeleted);
        break;
      case Filter.All:
        this.filteredTodos = [...this.todos.map(todo => ({ ...todo }))];
        break;
    }
    if (isFiltering) {
      this.updateTodoData();
    }
  }

  private updateTodoData() {
    this.displayTodoSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }

}
