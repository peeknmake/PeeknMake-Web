import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
    selector: 'app-search-configuration',
    template: `
    <button type="button" (click)="goToAboutPage()" class="mdl-button mdl-js-button mdl-js-ripple-effect">
        <i class="material-icons">help</i>
        <span>about</span>
    </button>
    <button type="button" (click)="setMapView()" class="mdl-button mdl-js-button mdl-js-ripple-effect">
    <i class="material-icons">map</i>
        <span>Explore Cuisines</span>
    </button>`
})

export class SearchConfigurationComponent implements OnInit {

    public showConfig = false;
    constructor(private router:Router) { }

    ngOnInit() {
    }
    public goToAboutPage() {
        this.router.navigate(['/shell/about']);
    }
    public setMapView(){
        this.router.navigate(['/search/mapview']);
    }

}
