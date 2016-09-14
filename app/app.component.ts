import {AppService,GlobalOperateEventArgs,GlobalOperateObservableArgs,GlobalOperateSubjectArgs} from './app.service';

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
                        <li routerLinkActive="active"><a routerLink="index/shot" >Shot</a> </li>
                    </ul>
                    <div class="navbar-form navbar-right">
                        <button class="btn btn-default" (click)="globalEvent_init(btnInit)" #btnInit>Init</button>
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
        this.appService.globalOperateObservable['globalSave']=Observable.create((o:Observer<GlobalOperateObservableArgs>)=>{
            this.saveObserver = o;
        });
        
    }

    ngOnInit() { 
        
    }
    private globalEvent_init(btn){
        this.appService.globalOperateSubject['globalInit'].next(new GlobalOperateSubjectArgs('globalInit','app.component',btn,null));
    }
    private globalEvent_new() {
        this.appService.globalOperateEvents.emit(new GlobalOperateEventArgs('new'));
    }
    private globalEvent_save(btn) {
         this.saveObserver.next(new GlobalOperateObservableArgs('globalSave','app.component',btn,null));
    }
}