import { Component,ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../Helper/user';
import { Router} from '@angular/router';
import {MatMenuTrigger } from '@angular/material'

@Component({
    selector: 'app-user-information',
    template: `
    <div  [matMenuTriggerFor]="usrmenu" style="padding-right:25px;float:right" on-mouseover="trigger.openMenu()">
        <span class="mdl-chip mdl-chip--contact" >
            <img class="mdl-chip__contact" src={{user.pictureLink}}>
            <span class="mdl-chip__text">{{user.userName}}</span>
        </span>
    </div>
    <mat-menu #usrmenu="matMenu" [overlapTrigger]="false">
        <button (click)="setShowconfig()" mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>set Preferene</span>
        </button>
        <button *ngIf="!isLoggedin" (click)="signInAction()" mat-menu-item>
            <mat-icon>assignment_ind</mat-icon>
            <span>Sign In</span>
        </button>
        <button *ngIf="isLoggedin" (click)="signInAction()" mat-menu-item>
            <mat-icon>assignment_ind</mat-icon>
            <span>Sign Out</span>
    </button>
    </mat-menu>
    `,
    styles: ['.mdl-chip__contact{ max-height: 50px }',
        '.mdl-chip:hover { cursor: pointer }']
})
export class UserInformationComponent implements OnInit {

    public user = new User("Guest", "Guest@sns.com");
    public isLoggedin = false;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

    constructor(private authService: AuthService,private router:Router) {
        this.authService.userChangeEvent.subscribe(user => {
            this.user = user;
            this.isLoggedin = (user.userName == "Guest") ? false : true;
        });
        this.user = this.authService.loggedUser;
        this.isLoggedin = this.authService.loggedIn;
    }

    public showUsrMenu(){
        this.trigger.openMenu();
    }

    ngOnInit() {
    }
    public setShowconfig() {
        this.router.navigate(['/shell/pref']);
    }
    public signInAction(){
        if(this.user.userName == "Guest"){
            this.authService.login();
        }else{
            this.authService.logout();
        }
    }
}
