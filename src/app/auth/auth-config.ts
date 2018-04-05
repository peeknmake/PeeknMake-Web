import { environment } from '../../environments/environment';

export interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
}

const PROD_AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'JgPmVv4NkeKrx4igeWNXwCxeJRoxscyA',
    CLIENT_DOMAIN: 'bhabani.auth0.com',
    AUDIENCE: 'http://peeknmake.com',
    REDIRECT: 'http://peeknmake.com/loginCallback',
    SCOPE: 'openid profile email'
}

const DEV_AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'eKCAmr7JzR6jsQeVLzbXKE3CGtRBBzR2',
    CLIENT_DOMAIN: 'bhabani.auth0.com',
    AUDIENCE: 'http://localhost:3000',
    REDIRECT: 'http://localhost:3000/loginCallback',
    SCOPE: 'openid profile email'
}

export const AUTH_CONFIG: AuthConfig = (environment.production) ?  PROD_AUTH_CONFIG:DEV_AUTH_CONFIG ;