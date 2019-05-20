import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '../todo.model';
import { NgForm } from '@angular/forms';
import { TodoService } from '../../todo.service';

//component decorator - ts feature - marks it as a Component for Angular to find
@Component({
	//html tag
	selector: 'app-todo-create',
	//angular looks for this file and parses it 
	templateUrl: './todo-create.component.html',
	styleUrls: ['./todo-create.component.scss'],
	providers: [TodoService]
})
export class TodoCreateComponent {
	
	todos: Array<Todo> = new Array<Todo>();
	enteredValue = "";
	// Output makes this an event you can listen to from the outside
	// - meaning in the direct parent component where you are using the selector e.g. <app-todo-create> in app.component.html
	@Output() todoCreated = new EventEmitter<Todo>();

	constructor(private _todoService: TodoService){}

	onAddTodo(form: NgForm) {
		if (form.invalid) {
			return;
		}
		const todo: Todo = { content: form.value.content };
		this.todoCreated.emit(todo);

		this._todoService.addTodo(todo)
			.subscribe(resNewTodo => {
				this.todos.push(resNewTodo);
			});

		//console.log();
		//alert('Todo added!!');
	}
}