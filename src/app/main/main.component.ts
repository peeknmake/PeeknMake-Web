import { AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SolrSearchComponent } from './solr-search/solr-search.component';
import { YoutubeApiService } from "../shared/services/youtube-api.service";
import { YoutubePlayerService } from "../shared/services/youtube-player.service";
import { PlaylistStoreService } from "../shared/services/playlist-store.service";
import { NotificationService } from '../shared/services/notification.service';
import { IndexDataService } from '../shared/services/indexDataService';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SearchObject } from '../shared/Helper/searchObject';

@Component({
    selector: 'main-list',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.css'],
})

export class MainComponent implements AfterViewInit {

    public componentHandler: any;

    @ViewChild(SolrSearchComponent)
    private solrSearch: SolrSearchComponent;

    public videoList = [];
    public videoPlaylist = [];
    public loadingInProgress: boolean = false;
    public playlistToggle: boolean = false;
    public filterToggle: boolean = false;
    public playlistNames: boolean = false;
    private pageLoadingFinished: boolean = false;
    public repeat: boolean = false;
    public shuffle: boolean = false;
    public searchParam: string;
    public link;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private youtubeService: YoutubeApiService,
        private youtubePlayer: YoutubePlayerService,
        private playlistService: PlaylistStoreService,
        private notificationService: NotificationService,
        private indexDataService: IndexDataService) {
        this.videoPlaylist = this.playlistService.retrieveStorage().playlists;
    }

    ngAfterViewInit() {
        this.searchParam = this.route.snapshot.paramMap.get('recipe');
        console.log('searhc param is ' + this.searchParam);
        let searObject = new SearchObject(0, this.searchParam);
        this.solrSearch.setSearchObject(searObject);
        this.solrSearch.doSearch();
    }

    playFirstInPlaylist(): void {
        if (this.videoPlaylist[0]) this.youtubePlayer.playVideo(this.videoPlaylist[0].id);
    }

    handleSearchVideo(videos: Array<any>): void {
        this.videoList = videos;
        this.filterToggle = true;
        console.log(this.videoList);
    }

    checkAddToPlaylist(video: any): void {
        if (!this.videoPlaylist.some((e) => e.id === video.id)) {
            this.videoPlaylist.push(video);
            this.playlistService.addToPlaylist(video);

            let inPlaylist = this.videoPlaylist.length - 1;
            setTimeout(() => {
                try {
                    let topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
                    let playlistEl = document.getElementById('playlist');
                    playlistEl.scrollTop = topPos - 100;
                } catch (exp) {
                    console.log("ignor this error until implementing the playlist");
                }
            });
        }
    }

    repeatActive(val: boolean): void {
        this.repeat = val;
        this.shuffle = false;
    }

    shuffleActive(val: boolean): void {
        this.shuffle = val;
        this.repeat = false;
    }

    toggleFilter(): void {
        this.filterToggle = !this.filterToggle;
    }
    searchMore(): void {
        if (this.loadingInProgress || this.pageLoadingFinished || this.videoList.length < 1) return;
        this.loadingInProgress = true;
        this.solrSearch.search()
            .then(data => {
                this.loadingInProgress = false;
                if (data.length < 1 || data.status === 400) {
                    setTimeout(() => {
                        this.pageLoadingFinished = true;
                        setTimeout(() => {
                            this.pageLoadingFinished = false;
                        }, 10000);
                    })
                    return;
                }
                data.forEach((val) => {
                    this.videoList.push(val);
                });
            }).catch(error => {
                this.loadingInProgress = false;
            })
    }

}
