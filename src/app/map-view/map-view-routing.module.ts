import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMapviewComponent } from './main-mapview/main-mapview.component'

const routes: Routes = [
    { path: '', redirectTo: 'map', pathMatch: 'full' },
    { path: 'map', component: MainMapviewComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapViewRoutingModule { }
