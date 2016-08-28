import 'rxjs/add/operator/toPromise';
import {Task} from './task.class';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
@Injectable()
export class TaskService {
    static TaskStatuses = [
        { value: '1', text: 'New' },
        { value: '2', text: 'Process' },
        { value: '3', text: 'Completed' }
    ];
    taskUrl='data/tasks';
    constructor(private http:Http) { }
    getTasks(){
        return this.http.get(this.taskUrl).toPromise().then(res=>{
            return res.json().data as Task[];
        });
    }
}