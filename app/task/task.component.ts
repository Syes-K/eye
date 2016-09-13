import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from './task.service';

@Component({
    moduleId: module.id,
    selector: 'agl-task',
    template: `
        <div>
            <router-outlet></router-outlet>
        </div>
    `,
     providers: [TaskService]
})
export class TaskComponent implements OnInit {
    constructor(private r: Router) { }

    ngOnInit() {

    }
}