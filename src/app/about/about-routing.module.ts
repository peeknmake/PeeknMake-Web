import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent} from './about.component';

const routes: Routes = [
    {path : '' , redirectTo: 'aboutPeekNMake' , pathMatch: 'full'},
    {path : 'aboutPeekNMake' , component : AboutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
