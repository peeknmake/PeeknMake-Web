import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MdlModule } from '@angular-mdl/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared.module';
import { MapViewRoutingModule } from './map-view-routing.module';

import { MainMapviewComponent } from './main-mapview/main-mapview.component';
import { HVideoComponent } from './h-video/h-video.component';
import { MapServiceService } from './map-service.service';

@NgModule({
    imports: [
        CommonModule,
        // MdlModule,
        MatTabsModule,
        SharedModule,
        MapViewRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCR-P6Z32gjEajXnb1UECYVUu8gBhvT0EE'
        })
    ],
    declarations: [MainMapviewComponent, HVideoComponent],
    providers: [MapServiceService]
})
export class MapViewModule { }
