import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../Helper/user'

@Component({
    selector: 'app-user-information',
    template: `
    <div (click)="signInAction()" style="padding-right:25px;float:right">
    <span class="mdl-chip mdl-chip--contact">
        <img class="mdl-chip__contact" src={{user.pictureLink}}>
        <span class="mdl-chip__text">{{user.userName}}</span>
    </span>
    </div>
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
