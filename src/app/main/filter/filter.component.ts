import { Component, Input, OnInit } from "@angular/core";
import { indexDatas, IndexedData } from '../../shared/Helper/indexdata';
import { IndexDataService } from '../../shared/services/indexDataService';
import { FacetService } from '../../shared/services/facetService';
import { Subscription } from 'rxjs/Subscription';
import { Router} from '@angular/router';

@Component({
    selector: 'filters',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css'],
    providers: [IndexDataService]
})

export class FilterComponent implements OnInit {
    @Input() filterlistToggle;
    videos: IndexedData[];
    selectedVideo: IndexedData;
    likefacets: any;
    locationfacets: any;
    ingredientfacets: any;
    contenttypefacets: any;
    languagefacets:any;
    subscription: Subscription;
    

    constructor(private dataService: FacetService , private router :Router) {
        this.subscription = this.dataService.facet$.subscribe(message => {
            this.likefacets = message['likes']['buckets'];
            this.locationfacets = message['Recipelocation']['buckets'];
            this.ingredientfacets = message['Ingredients']['buckets'];
            this.contenttypefacets = message['contenttype']['buckets'];
            this.languagefacets = message['Language']['buckets'];
        });
    }
    getFilterVideos(): void {
    }
    ngOnInit(): void {
        this.getFilterVideos();
    }
    onSelect(video: IndexedData): void {
        this.selectedVideo = video;
    }
    public setMapView(){
        this.router.navigate(['/mapview']);
    }
}
