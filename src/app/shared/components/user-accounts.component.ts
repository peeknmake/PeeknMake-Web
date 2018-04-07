import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router} from '@angular/router';

@Component({
    selector: 'app-user-accounts',
    template: `
    <div class="sns-link-account">
    <div class="sns-link-buttons">
        <button *ngIf="!isLoggedin" (click)="singInUser()" class="sns-link-button mdl-button mdl-js-button mdl-button--raised">
            <i class="material-icons">assignment_ind</i>
            <span>Sing in</span>
        </button>
        <button *ngIf="isLoggedin" (click)="signOutUser()" class="sns-link-button mdl-button mdl-js-button mdl-button--raised">
            <i class="material-icons">assignment_ind</i>
            <span>Sing out</span>
        </button>
        <button (click)="setShowconfig()" class="sns-link-button mdl-button mdl-js-button mdl-button--raised">
            <i class="material-icons">settings</i>
            <span>set Preferene</span>
        </button>
    </div>
    </div>`,
    // <button class="sns-link-button mdl-button mdl-js-button mdl-button--raised">
    //     <i class="material-icons">phonelink_setup</i>
    //     <span>Link Devices</span>
    // </button>

    styles: ['.sns-link-account {margin-top: 20px;display:inline-block; width:100%}',
        '.sns-link-buttons{display: flex;justify-content: center}',
        '.sns-link-button{background-color: grey;color: white;margin:5px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)}'
    ]
})
export class UserAccountsComponent implements OnInit {

    public isLoggedin = false;
    constructor(private authService: AuthService,private router:Router) {
        this.isLoggedin = authService.loggedIn;
        this.authService.userChangeEvent.subscribe((user) => this.isLoggedin = (user.userName == "Guest") ? false : true);
    }

    ngOnInit() {
    }
    public setShowconfig() {
        this.router.navigate(['/shell/pref']);
    }
    public signOutUser() {
        this.authService.logout();
    }
    public singInUser() {
        this.authService.login();
    }
}
