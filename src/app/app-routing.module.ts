import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { PageNotFoundComponent } from './shared/components/not-found.component';
import { LoginCallbackComponent } from './shared/components/login-callback.component';
import { UserPreferenceModule } from './user-preference/user-preference.module';
import { MapViewModule } from './map-view/map-view.module';
import { ShellComponent } from './shell.component';
import { SearchComponent } from './search.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/frontpage', pathMatch: 'full' },
    { path: 'frontpage', component: FrontpageComponent },
    { path: 'search', component: MainComponent },
    { path: 'loginCallback', component: LoginCallbackComponent },
    { path: 'sample', component: SearchComponent },
    {
        path: 'shell',
        component: ShellComponent,
        children: [{
            path: 'about',
            loadChildren: './about/about.module#AboutModule'
        }, {
            path: 'pref',
            loadChildren: './user-preference/user-preference.module#UserPreferenceModule'
        }]
    },
    { path: 'mapview', loadChildren: './map-view/map-view.module#MapViewModule' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }