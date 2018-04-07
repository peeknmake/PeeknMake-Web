import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-shell',
    template: ` <div mdl-shadow="2">
                    <mat-toolbar color="primary">
                    <mat-toolbar-row>
                                <app-go-home-component class="sns-go-home"></app-go-home-component>
                                <span class="header-spacer"></span>
                                <app-user-information></app-user-information>
                    </mat-toolbar-row>
                    </mat-toolbar>
                    <router-outlet></router-outlet> 
                </div>`,
    styles: []
})
export class ShellComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
