import {AppService,GlobalOperateEventArgs} from './app.service';

import {Task} from './task/task.class';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import  'rxjs/add/observable/fromEvent';
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
                    <div class="navbar-form navbar-right">
                        <button class="btn btn-default" (click)="globalEvent_new()">New</button>
                        <button class="btn btn-success" (click)="globalEvent_save(btnSave)" #btnSave>Save</button>
                    </div>
                </div>
            </nav>
        </header>
        <div class="container">
             <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent implements OnInit {
    private saveObserver: Observer<any>;
    constructor(private r:Router,private appService:AppService) { 
        this.appService.GlobalOperateObservable["globalSave"]=Observable.create((o:Observer<any>)=>{
            this.saveObserver = o;
        })
    }

    ngOnInit() { 
        
    }
    private globalEvent_new() {
        this.appService.globalOperateEvents.emit(new GlobalOperateEventArgs('new'));
    }
    private globalEvent_save(btn) {
         this.appService.globalOperateEvents.emit(new GlobalOperateEventArgs('save'));
         this.saveObserver.next(btn);
    }
}