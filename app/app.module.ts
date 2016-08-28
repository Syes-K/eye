import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing'; //TODO: Create app.routing

import{TaskModule} from './task/task.module';
import {TaskComponent} from './task/task.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        TaskModule,
        routing,
    ],
    declarations: [AppComponent],
    providers: [/* TODO: Providers go here */],
    bootstrap: [AppComponent],
})
export class AppModule { }
