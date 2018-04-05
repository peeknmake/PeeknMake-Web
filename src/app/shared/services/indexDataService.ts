import { Injectable } from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { indexDatas, IndexedData } from '../Helper/indexdata';
import { AppSettings } from '../constants';
import { NotificationService } from './notification.service';
import { SearchObject } from '../Helper/searchObject';
import { FacetService } from './facetService';

@Injectable()
export class IndexDataService {

    public nextToken: string;
    public lastQuery: string;
    getIndexedData(): Promise<IndexedData[]> {
        return Promise.resolve(indexDatas);
    }
    constructor(private jsonp: Jsonp, private http: Http,
        private notificationService: NotificationService,
        private facetService: FacetService
    ) { }

    suggest(term: string) {
        let solrUrl = '/api/suggest'
        let params = new URLSearchParams();
        params.set('suggest', 'true');
        // params.set('suggest.build', 'true');
        params.set('wt', 'json');
        params.set('suggest.q', term);
        return this.http
            .get(solrUrl, { search: params })
            .map((response) => {
                let jsonRes = response.json();
                let suggestions = [];
                let suggestionObject = jsonRes['suggest']['default'][term]['suggestions'];
                for (let i = 0; i < suggestionObject.length; i++) {
                    suggestions[i] = suggestionObject[i]['term'];
                }
                return suggestions;
            }).toPromise();
    }

    searchByLocation(lat: number, lan: number, rad: number): Promise<any> {
        let solrUrl = '/api/videoincircle';
        let params = new URLSearchParams();
        params.set('lat', String(lat));
        params.set('lan', String(lan));
        params.set('rad', String(rad));
        return this.http
            .get(solrUrl, { search: params })
            .map((response) => {
                let jsonRes = response.json();
                return jsonRes['response']['docs'];
            }).toPromise().catch(this.handleError);
    }
    searchStateVideos(srchObj: SearchObject): Promise<any> {
        let solrUrl = '/api/select';
        let params = new URLSearchParams();
        params.set('wt', 'json');
        params.set('rows', '' + srchObj.noOfRow);
        params.set('q', 'recipe');
        params.set('fq', srchObj.searchTerm);
        params.set('fl', 'youtubevideoID');
        params.set('start', '' + srchObj.pageNum * srchObj.noOfRow);
        console.log('going to search for ');
        console.log(srchObj)
        return this.http
            .get(solrUrl, { search: params })
            .map((response) => {
                let jsonRes = response.json();
                let suggestions = [];
                let suggestionObject = jsonRes['response']['docs'];
                console.log('number of search result for ' + srchObj.searchTerm + '=' + suggestionObject.length);
                let ids = [];
                suggestionObject.forEach((item) => {
                    ids.push(item.youtubevideoID);
                });
                return ids;
            }).toPromise().catch(this.handleError);
    }
    searchVideos(srchObj: SearchObject): Promise<any> {
        let solrUrl = '/api/select';
        let params = new URLSearchParams();
        params.set('wt', 'json');
        params.set('rows', '' + srchObj.noOfRow);
        params.set('q', srchObj.getRecipeTitlefuzzySearchTerm());
        // params.set('fq', args.searchTerm);
        params.set('fl', 'youtubevideoID');
        params.set('start', '' + srchObj.pageNum * srchObj.noOfRow);
        params.set('json.facet', '{contenttype: { terms: { field: food_Content } },' +
            'Recipelocation: { terms: { field: video_country } },' +
            'Ingredients: { terms: { field: ingredients } },' + 'Language: { terms: { field: video_langugages } },' +
            'likes: { range: { field: likes, start: 0, end: 1000, gap: 200 } }}')
        console.log('going to search for ');
        console.log(srchObj)

        return this.http
            .get(solrUrl, { search: params })
            .map((response) => {
                console.log(response);
                let jsonRes = response.json();
                let suggestions = [];
                let suggestionObject = jsonRes['response']['docs'];
                this.facetService.setFaets(jsonRes['facets']);
                console.log('number of search result for ' + srchObj.searchTerm + '=' + suggestionObject.length);
                let ids = [];
                suggestionObject.forEach((item) => {
                    ids.push(item.youtubevideoID);
                });
                return this.getVideos(ids);
            }).toPromise().catch(this.handleError);
    }

    searchNext(args: any): Promise<any> {
        let solrUrl = AppSettings.SOLR_SERVER_PATH + 'foodx/select';
        let params = new URLSearchParams();
        params.set('rows', '' + AppSettings.max_results);
        params.set('start', '' + args['pagenum'] * AppSettings.max_results);
        params.set('wt', 'json');
        params.set('q', 'recipeTitle:' + args['term']);
        params.set('json.wrf', 'JSONP_CALLBACK');

        return this.http.get(solrUrl, { search: params })
            .map(response => {
                let jsonRes = response.json();
                let suggestions = [];
                let suggestionObject = jsonRes['response']['docs'];
                let ids = [];
                this.facetService.setFaets('facets');
                suggestionObject.forEach((item) => {
                    ids.push(item.youtubevideoID);
                });

                return this.getVideos(ids);
            })
            .toPromise()
            .catch(this.handleError)
    }

    getVideos(ids): Promise<any> {
        return this.http.get(AppSettings.base_url + 'videos?id=' + ids.join(',') + '&maxResults=' + AppSettings.max_results + '&type=video&part=snippet,contentDetails,statistics&key=' + AppSettings.YOUTUBE_API_KEY)
            .map(results => {
                return results.json()['items'];
            })
            .toPromise()
            .catch(this.handleError)
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }
}
