import { Component, OnInit } from '@angular/core';
import { MouseEvent, LatLngLiteral } from '@agm/core';
import { mpaStyles } from './map-style';
import { NotificationService } from '../../shared/services/notification.service';
import { IndexDataService } from '../../shared/services/indexDataService';
import { SearchObject } from '../../shared/Helper/searchObject';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-main-mapview',
    templateUrl: './main-mapview.component.html',
    styleUrls: ['./main-mapview.component.css']
})
export class MainMapviewComponent implements OnInit {

    public mainMapStyles = mpaStyles;
    public browseTab = true;
    private videsIds = [];
    private states = [];
    public markers: marker[] = [{
        lat: 20.673858,
        lng: 85.815982,
        label: 'cuttack',
        draggable: false
    }];
    public zoom = 6;
    public maxZoom = 8;
    public minZoom = 4;
    public lat: number = 20.673858;
    public lng: number = 85.815982;
    public mapVideos = [];
    private mapSearchObject: SearchObject;
    private agmCircleCenter = { lat: 20, lng: 85 };
    private cirCenter$ = new Subject<LatLngLiteral>();
    private videoId$ = new Subject<string>();
    private agrCircleRad = 200000;

    constructor(private solrService: IndexDataService,
        private notificationService: NotificationService,
        private router: Router) { }

    ngOnInit() {
        this.cirCenter$.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(result => {
            this.agmCircleCenter = result;
            return this.solrService.searchByLocation(result.lat, result.lng, this.agrCircleRad / 1000)
                .then(data => {
                    return this.processCircleData(data);
                })
                .then(result => this.mapVideos = result)
                .then(videos => this.processStateData())
                .then(resultVideos => this.videoId$.next(resultVideos))
                .catch(error => console.log(error));
        })
        this.videoId$.subscribe(result => {
            this.videsIds.concat(result);
            if (this.mapVideos.length < 12) {
                console.log(result);
                this.solrService.getVideos(result.slice(this.mapVideos.length, 20))
                    .then(resultVideos => {
                        this.mapVideos =this.mapVideos.concat(resultVideos);
                    });
            }
        });
        this.cirCenter$.next(this.agmCircleCenter);
    }
    goHome() {
        console.log("Going to the front page route");
        this.router.navigate(['/']);
    }
    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }
    mapClicked($event: MouseEvent) {
    }
    browseClicked() {
        this.browseTab = true;
    }
    markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }
    filterClicked() {
        this.browseTab = false;
    }
    circleRadChanged(radius: number) {
        this.agrCircleRad = radius;
        console.log("radius of the circle changed" + this.agrCircleRad);
        this.solrService.searchByLocation(this.agmCircleCenter.lat, this.agmCircleCenter.lng, this.agrCircleRad / 1000)
            .then(data => this.processCircleData(data))
            .then(result => this.mapVideos = result)
            .then(videos => this.processStateData())
            .then(resultVideos => this.videoId$.next(resultVideos))
            .catch(error => console.log(error));
    }
    circleCenterChanged(latlng: LatLngLiteral) {
        this.cirCenter$.next(latlng);
    }

    processCircleData(data: any) {
        this.videsIds = [];
        this.states = [];
        this.markers = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i]['video_id'] !== undefined) this.videsIds = this.videsIds.concat(data[i]['video_id']);
            this.states.push(data[i]['state_name']);
            this.markers.push({
                lat: parseFloat(data[i].geo_location.split(',')[0]),
                lng: parseFloat(data[i].geo_location.split(',')[1]),
                label: data[i].id,
                draggable: false
            });
        }
        return this.solrService.getVideos(this.videsIds.slice(0, 12));
    }
    processStateData() {
        console.log('going to process state datas');
        this.mapSearchObject = new SearchObject(0, 'video_state:' + this.states[0]);
        return this.solrService.searchStateVideos(this.mapSearchObject);
    }
}

interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
