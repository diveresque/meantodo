import { Component } from '@angular/core';
import { Todo } from './todos/todo.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  storedTodos: Todo[] = [];

  onTodoAdded(todo) {
  	this.storedTodos.push(todo);
  }
}
