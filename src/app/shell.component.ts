import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-shell',
    template: ` <div mdl-shadow="2">
                    <div mdl-layout-fixed-header mdl-layout-header-seamed>
                        <div class="map-view-header">
                            <div class="mdl-layout__header-row">
                                <app-go-home-component class="sns-go-home"></app-go-home-component>
                                <app-user-information></app-user-information>
                            </div>
                        </div>
                    </div>
                    <router-outlet></router-outlet> 
                </div>`,
    styles: []
})
export class ShellComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
