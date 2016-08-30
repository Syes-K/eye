import 'rxjs/add/operator/toPromise';
import {Task} from './task.class';
import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions} from '@angular/http';
@Injectable()
export class TaskService {
    static TaskStatuses = [
        { value: '1', text: 'New' },
        { value: '2', text: 'Process' },
        { value: '3', text: 'Completed' }
    ];
    taskUrl = 'data/tasks';
    constructor(private http: Http) { }
    getTasks() {
        return this.http.get(this.taskUrl).toPromise().then(res => {
            return res.json().data as Task[];
        });
    }
    saveTasks(tasks: Task[]) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data = JSON.stringify(tasks);
        return this.http.put(this.taskUrl, data, options).toPromise();
    }
}