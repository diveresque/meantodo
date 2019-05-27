import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map, tap } from 'rxjs/operators';
import { Todo } from './todos/todo.model';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

	// these were configured in express server
	private _getUrl = "/api/todos";
	private _postUrl = "/api/todo";

	//public todoChanged: BehaviorSubject<Todo[]> = new BehaviorSubject([]);
	//todoChangedObservable = this.todoChanged.asObservable();

	public _todos: Todo[] = [];

 	constructor(private _http: Http) { 
 		this.loadGroup();
 	}

 	// not needed?
 	public getList(): any {

 		const todosObservable = new Observable(observer => {
 			setTimeout(() => {
 				observer.next(this._todos);
 			}, 2000);
 		});

 		return todosObservable;
 	}

 	loadGroup() {

 		console.log("Loading group.. Todos: " + this._todos);
 		this.getTodos().subscribe(response => {
 			this._todos = response;
 			//this.todoChanged.next(this._todos);
 		});
 		console.log("Loaded group.. End Todos: " + this._todos);
 	
 	}

 	getTodos() {
		let json = this._http.get(this._getUrl)
 			.pipe(map((response: Response) => response.json()));
 		//console.log(json); // returns Observable	
 		return json;
 	}

 	addTodo(todo: Todo) {
 		console.log("Add Todo");
 		let headers = new Headers({ 'Content-Type': 'application/json' });
 		let options = new RequestOptions({ headers: headers });
 		let sent = this._http.post(this._postUrl, JSON.stringify(todo), options)
 			.pipe(map((response: Response) => response.json()), tap(() => this.loadGroup()));
 		//console.log(sent); // returns Observable
 		this._todos.push(todo);
 		return sent;
 	}
}
