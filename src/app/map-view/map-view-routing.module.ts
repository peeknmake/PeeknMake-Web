import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMapviewComponent } from './main-mapview/main-mapview.component'

const routes: Routes = [
    { path: '', redirectTo: 'aboutPeekNMake', pathMatch: 'full' },
    { path: 'aboutPeekNMake', component: MainMapviewComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapViewRoutingModule { }
