import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Todo } from './todos/todo.model';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

	// these were configured in express server
	private _getUrl = "/api/todos";
	private _postUrl = "/api/todo";

	public todoChanged: BehaviorSubject<Object> = new BehaviorSubject<Object>(1);
	//todoChangedObservable = this.todoChanged.asObservable();

 	constructor(private _http: Http) { }

 	getTodos() {
		let json = this._http.get(this._getUrl)
 			.pipe(map((response: Response) => response.json()));
 		//console.log(json); // returns Observable
 		
 		return json;
 	}

 	addTodo(todo: Todo) {
 		let headers = new Headers({ 'Content-Type': 'application/json' });
 		let options = new RequestOptions({ headers: headers });
 		let sent = this._http.post(this._postUrl, JSON.stringify(todo), options)
 			.pipe(map((response: Response) => response.json()));
 		console.log(sent); // returns Observable
 		this.todoChanged.next(this.getTodos());	
 		return sent;
 	}
}
