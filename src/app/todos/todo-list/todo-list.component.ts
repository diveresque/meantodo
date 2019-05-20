import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../../todo.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Http } from '@angular/http';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss'],
	providers: [TodoService]
})
export class TodoListComponent implements OnInit {
	// todos = [
	// 	{ content: "This is the First Todo" },
	// 	{ content: "This is the Second Todo" }
	// ];
	@Input() public todos: Todo[] = [];
	//todos: Todo[] = [];

	//private readonly refreshToken$ = new BehaviorSubject(undefined);
	//private readonly task$ = this.refreshToken$.pipe(
    //switchMap(() => this._http.get('/api/todos')));

	constructor(private _todoService: TodoService){}

	getTodos() {
		console.log('get todos');
		this._todoService.getTodos()
			.subscribe((resTodoData) => {this.todos = resTodoData; console.log(resTodoData); });

		//this.refreshToken$.next(undefined);
		console.log('end todos');

	}

	ngOnInit() {
		console.log('inittt');
		this.getTodos();
		
	}
}