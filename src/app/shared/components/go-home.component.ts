import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-go-home-component',
    template: `<div  class="mdl-layout-title" (click)="goHome()"  style="display:inline-block">
    <i class="material-icons">home</i>
    <span  style="font-family:cursive">Peek N Make</span>
    </div>`
})
export class GoHomeComponent implements OnInit {

    constructor(private route: ActivatedRoute,private router: Router) { }

    ngOnInit() {
    }

    goHome(){
        console.log("Going to the front page route");
        this.router.navigate(['/']);
    }
}
