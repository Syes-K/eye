import { Injectable,EventEmitter } from '@angular/core';

export class GlobalOperateEventArgs{
    constructor(public eventName:string){};
}

@Injectable()
export class AppService {
    globalOperateEvents:EventEmitter<GlobalOperateEventArgs>= new EventEmitter<GlobalOperateEventArgs>();
    constructor() { }
}
