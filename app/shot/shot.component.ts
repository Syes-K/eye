import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'agl-shot',
     template: `
        <div>
            <router-outlet></router-outlet>
        </div>
    `,
})
export class ShotComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}