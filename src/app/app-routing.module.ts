import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { MainComponent } from './main/main.component';
import { FrontpageComponent }     from './frontpage/frontpage.component';
import { PageNotFoundComponent } from './shared/components/not-found.component';
import { LoginCallbackComponent } from './shared/components/login-callback.component';
import { UserPreferenceModule } from './user-preference/user-preference.module';
import { MapViewModule } from './map-view/map-view.module';
 
const appRoutes: Routes = [
  { path: '',component: FrontpageComponent},
  { path: 'search',   component: MainComponent},
  { path: 'loginCallback',component: LoginCallbackComponent},
  { path: 'about',loadChildren: './about/about.module#AboutModule'},
  { path: 'pref',loadChildren: './user-preference/user-preference.module#UserPreferenceModule'},
  { path: 'mapview',loadChildren: './map-view/map-view.module#MapViewModule'},
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
export class AppRoutingModule {}