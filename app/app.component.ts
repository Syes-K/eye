import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
        <header >
            <nav class="navbar navbar-default">
                <div class="navbar-header">
                    <a routerLink="index/task" class="navbar-brand">Task</a>
                </div>
                <div class="container"> 
                    <ul class="nav navbar-nav">
                        <li routerLinkActive="active"><a routerLink="index/task/list" >list</a> </li>
                    </ul>
                </div>
            </nav>
        </header>
        <div class="container">
             <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent implements OnInit {
    constructor(private r:Router) { }

    ngOnInit() { 
        
    }
}