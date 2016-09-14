import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'agl-shot-battle-field',
    styleUrls:['shot.battlefield.component.css'],
    template: `
        <div class="battle-field" 
                [style.width]="width+'px'"
                [style.height]="height+'px'">
            <agl-shot-player [battleSize]="{width:width,height:height}"></agl-shot-player> 
        </div>
    `
})
export class ShotBattleFieldComponent implements OnInit {
    width:number=576;
    height:number=680;
    constructor() { }

    ngOnInit() { }
}