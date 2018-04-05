import { Injectable, Output,EventEmitter} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth-config';
import { Router } from '@angular/router';
import { User } from '../shared/Helper/user';


@Injectable()
export class AuthService {
    // Create Auth0 web auth instance
    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.CLIENT_ID,
        domain: AUTH_CONFIG.CLIENT_DOMAIN,
        responseType: 'token id_token',
        redirectUri: AUTH_CONFIG.REDIRECT,
        audience: AUTH_CONFIG.AUDIENCE,
        scope: AUTH_CONFIG.SCOPE
    });
    public userProfile: any;
    private user = new User("Guest", "Guest@sns.com");
    @Output() userChangeEvent: EventEmitter<any> = new EventEmitter(true);

    // Create a stream of logged in status to communicate throughout app
    loggedIn: boolean;
    loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

    constructor(private router: Router) {
        // If authenticated, set local profile property and update login status subject
        // If token is expired, log out to clear any data from localStorage
        if (this.authenticated) {
            this.userProfile = JSON.parse(localStorage.getItem('profile'));
            this.user = new User(this.userProfile.name, this.userProfile.email);
            this.user.setPictureLink(this.userProfile.picture);
            this.setLoggedIn(true);
        } else {
            this.logout();
        }
    }

    setLoggedIn(value: boolean) {
        // Update login status subject
        this.loggedIn$.next(value);
        this.loggedIn = value;
    }

    getLoggedIn(): boolean {
        return this.loggedIn;
    }

    login() {
        // Auth0 authorize request
        this.auth0.authorize();
    }

    handleAuth() {
        // When Auth0 hash parsed, get profile
        this.auth0.parseHash(window.location.hash, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this._getProfile(authResult);
            } else if (err) {
                console.error(`Error: ${err.error}`);
            }
            this.router.navigate(['/']);
        });
    }

    private _getProfile(authResult) {
        // Use access token to retrieve user's profile and set session
        this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
            this._setSession(authResult, profile);
        });
    }

    private _setSession(authResult, profile) {
        const expTime = authResult.expiresIn * 1000 + Date.now();
        // Save session data and update login status subject
        localStorage.setItem('token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('expires_at', JSON.stringify(expTime));
        this.userProfile = profile;
        this.user = new User(this.userProfile.name, this.userProfile.email);
        this.user.setPictureLink(this.userProfile.picture);
        this.userChangeEvent.emit(this.user);
        this.setLoggedIn(true);
    }

    logout() {
        // Remove tokens and profile and update login status subject
        localStorage.removeItem('token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        localStorage.removeItem('expires_at');
        this.userProfile = undefined;
        this.user = new User("Guest", "Guest@sns.com");
        this.userChangeEvent.emit(this.user);
        this.setLoggedIn(false);
    }

    get authenticated(): boolean {
        // Check if current date is greater than expiration
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return Date.now() < expiresAt;
    }

    get loggedUser():User{
        return this.user;
    }

}