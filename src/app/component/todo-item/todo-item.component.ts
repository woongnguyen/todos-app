import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

const fadeAtrickeThroughAnimation = trigger('fadeStrikeThrough', [
  state(
    'active',
    style({
      color: '#000',
    })
  ),
  state(
    'completed',
    style({
      textDecoration: 'line-through',
      color: '#cdcdcd',
      fontSize: '16px'
    })
  ),
  transition('active <=> completed', [animate(250)]),
])
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [fadeAtrickeThroughAnimation]
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() removeTodo: EventEmitter<number> = new EventEmitter<number>();

  isHovered = false;
  isEditing = false;
  constructor() { }

  ngOnInit() {
  }
  changeTodoStatus() {
    this.changeStatus.emit({ ...this.todo, isCompleted: !this.todo.isCompleted });
  }
  submitEdit(event: KeyboardEvent) {
    const { keyCode } = event;
    event.preventDefault();
    if (keyCode === 13) {
      this.editTodo.emit(this.todo);
      this.isEditing = false;
    }
  }
  deleteTodo() {
    this.removeTodo.emit(this.todo.id);
  }

}
