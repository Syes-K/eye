import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'agl-task',
    template: `
        <div>
            <router-outlet></router-outlet>
        </div>
    `
})
export class TaskComponent implements OnInit {
    constructor(private r: Router) { }

    ngOnInit() {

    }
}