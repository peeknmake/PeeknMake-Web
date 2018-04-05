import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingComponent } from './user-setting/user-setting.component';

const routes: Routes = [
    { path: '', redirectTo: 'aboutPeekNMake', pathMatch: 'full' },
    { path: 'aboutPeekNMake', component: UserSettingComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserPreferenceRoutingModule { }
