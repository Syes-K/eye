import { Injectable,EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
export class GlobalOperateEventArgs{
    constructor(public eventName:string){};
}

@Injectable()
export class AppService {
    globalOperateEvents:EventEmitter<GlobalOperateEventArgs>= new EventEmitter<GlobalOperateEventArgs>();
    GlobalOperateObservable:{[index:string]:Observable<any>}={};

    constructor() { 

    }
}
