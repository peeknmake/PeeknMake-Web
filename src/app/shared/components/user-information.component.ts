import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../Helper/user'

@Component({
    selector: 'app-user-information',
    template: `
    <div style="padding-right:25px;float:right">
    <button mat-fab [matMenuTriggerFor]="usrmenu"  >
        <!--span class="mdl-chip mdl-chip--contact" -->
            <img class="mdl-chip__contact" src={{user.pictureLink}}>
            <span class="mdl-chip__text">{{user.userName}}</span>
        <!--/span-->
    </button>
    </div>
    <mat-menu #usrmenu="matMenu" [overlapTrigger]="false">
        <button mat-menu-item>
            <mat-icon>dialpad</mat-icon>
            <span>Redial</span>
        </button>
        <button mat-menu-item disabled>
            <mat-icon>voicemail</mat-icon>
            <span>Check voicemail</span>
        </button>
        <button mat-menu-item>
            <mat-icon>notifications_off</mat-icon>
            <span>Disable alerts</span>
        </button>
    </mat-menu>
    `,
    styles: ['.mdl-chip__contact{ max-height: 50px }',
        '.mdl-chip:hover { cursor: pointer }']
})
export class UserInformationComponent implements OnInit {
    public user = new User("Guest", "Guest@sns.com");

    constructor(private authService: AuthService) {
        this.user = this.authService.loggedUser;
        this.authService.userChangeEvent.subscribe(user => this.user = user);
    }

    ngOnInit() {
    }
    public signInAction(){
        if(this.user.userName == "Guest"){
            this.authService.login();
        }else{
            this.authService.logout();
        }
    }
}
