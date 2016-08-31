import {AppService} from './app.service';
import {TaskModule} from './task/task.module';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {TaskComponent} from './task/task.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        TaskModule,
        routing,
    ],
    declarations: [AppComponent],
    providers: [AppService],
    bootstrap: [AppComponent],
})
export class AppModule { }
