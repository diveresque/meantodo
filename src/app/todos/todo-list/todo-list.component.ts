import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../../todo.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Http } from '@angular/http';
import { List } from 'immutable';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss'],
	providers: [TodoService]
})
export class TodoListComponent implements OnInit {

	@Input() public todos: Observable<Todo[]>;

    //private _todosList: BehaviorSubject<List<Todo>> = new BehaviorSubject(List([]));

	constructor(private _todoService: TodoService){
		
	}

	getTodos() {
		console.log('get todos: ' + this.todos);
		this.todos = interval(1000)
						.pipe(
						switchMap(() => this._todoService.getTodos())
						);

		console.log('end todos: ' + this.todos);

	}

	ngOnInit() {
		console.log('inittt');
		this.getTodos();
		
	}
}