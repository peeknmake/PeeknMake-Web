import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpModule, JsonpModule, URLSearchParams } from "@angular/http";
import { HttpClientModule , HttpClientJsonpModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/modules/shared.module';
import { MatModuleModule } from './shared/modules/mat-module.module';
import { LayoutModule } from '@angular/cdk/layout';

// Components
import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";
import { VideosListComponent } from "./main/videos-list/videos-list.component";
import { VideosPlaylistComponent } from "./main/videos-playlist/videos-playlist.component";
import { VideoPlayerComponent } from "./main/video-player/video-player.component";
import { FilterComponent } from "./main/filter/filter.component";
import { SolrSearchComponent } from "./main/solr-search/solr-search.component";
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { PageNotFoundComponent } from './shared/components/not-found.component';
import { FrontpageComponent } from './frontpage/frontpage.component';

// Services
import { YoutubeApiService } from "./shared/services/youtube-api.service";
import { YoutubePlayerService } from "./shared/services/youtube-player.service";
import { PlaylistStoreService } from "./shared/services/playlist-store.service";
import { NotificationService } from "./shared/services/notification.service";
import { IndexDataService } from './shared/services/indexDataService';
import { FacetService } from './shared/services/facetService';
import { AuthService } from './auth/auth.service';

// Pipes
import { VideoDurationPipe } from "./shared/pipes/video-duration.pipe";
import { VideoLikesPipe } from "./shared/pipes/video-likes.pipe";
import { VideoViewsPipe } from "./shared/pipes/video-views.pipe";
import { PlaylistItemNamePipe } from "./shared/pipes/playlist-item-name.pipe";
import { LazyScroll } from "./shared/directives/lazy-scroll/lazy-scroll.directive";
import { ShellComponent } from './shell.component';
import { SearchComponent } from './search.component';
import { ProxyComponent } from './proxy.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,HttpClientJsonpModule,
        ReactiveFormsModule, FormsModule,
        YoutubePlayerModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LayoutModule,
        MatModuleModule,
        SharedModule,
    ],
    declarations: [
        AppComponent,
        MainComponent,
        VideosListComponent,
        VideoPlayerComponent,
        VideosPlaylistComponent,
        PageNotFoundComponent,
        MainComponent,
        VideoDurationPipe,
        VideoLikesPipe,
        VideoViewsPipe,
        PlaylistItemNamePipe,
        LazyScroll,
        FilterComponent,
        SolrSearchComponent,
        FrontpageComponent,
        ShellComponent,
        SearchComponent,
        ProxyComponent,

    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        YoutubeApiService,
        YoutubePlayerService,
        PlaylistStoreService,
        NotificationService,
        IndexDataService,
        FacetService,
        AuthService
    ]
})
export class FoodXModule {
}
