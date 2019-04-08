import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';
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
    constructor(private http: HttpClient,
        private notificationService: NotificationService,
        private facetService: FacetService
    ) { }

    suggest(term: string) {
        let solrUrl = '/api/suggest'
        let params = {
            'suggest': 'true',
            // 'suggest.build', 'true',
            'wt': 'json',
            'suggest.q': term
        }
        return this.http
            .get(solrUrl, { params: params })
            .pipe(map((jsonRes) => {
                // let jsonRes = response.json();
                let suggestions = [];
                let suggestionObject = jsonRes['suggest']['default'][term]['suggestions'];
                for (let i = 0; i < suggestionObject.length; i++) {
                    suggestions[i] = suggestionObject[i]['term'];
                }
                return suggestions;
            })).toPromise();
    }

    searchByLocation(lat: number, lan: number, rad: number): Promise<any> {
        let solrUrl = '/api/videoincircle';
        let params = {
            'lat': String(lat),
            'lan': String(lan),
            'rad': String(rad)
        }
        return this.http
            .get(solrUrl, { params: params })
            .pipe(map((jsonRes) => {
                // let jsonRes = response.json();
                return jsonRes['response']['docs'];
            })).toPromise().catch(this.handleError);
    }
    searchStateVideos(srchObj: SearchObject): Promise<any> {
        let solrUrl = '/api/select';
        let params = {
            'wt': 'json'
            , 'rows': '' + srchObj.noOfRow
            , 'q': 'recipe'
            , 'fq': srchObj.searchTerm
            , 'fl': 'youtubevideoID'
            , 'start': '' + srchObj.pageNum * srchObj.noOfRow
        }
        console.log('going to search for ');
        console.log(srchObj)
        return this.http
            .get(solrUrl, { params: params })
            .pipe(map((jsonRes) => {
                // let jsonRes = response.json();
                let suggestions = [];
                let suggestionObject = jsonRes['response']['docs'];
                console.log('number of search result for ' + srchObj.searchTerm + '=' + suggestionObject.length);
                let ids = [];
                suggestionObject.forEach((item) => {
                    ids.push(item.youtubevideoID);
                });
                return ids;
            })).toPromise().catch(this.handleError);
    }
    searchVideos(srchObj: SearchObject): Promise<any> {
        let solrUrl = '/api/select';
        let params = {
            'wt': 'json'
            , 'rows': '' + srchObj.noOfRow
            , 'q': srchObj.getRecipeTitlefuzzySearchTerm()
            , 'fl': 'youtubevideoID'
            , 'start': '' + srchObj.pageNum * srchObj.noOfRow
            , 'json.facet': '{contenttype: { terms: { field: food_Content } },' +
                'Recipelocation: { terms: { field: video_country } },' +
                'Ingredients: { terms: { field: ingredients } },' + 'Language: { terms: { field: video_langugages } },' +
                'likes: { range: { field: likes, start: 0, end: 1000, gap: 200 } }}'
        }
        console.log('going to search for ');
        console.log(srchObj)

        return this.http
            .get(solrUrl, { params: params })
            .pipe(map((jsonRes) => {
                console.log(jsonRes);
                // let jsonRes = response.json();
                let suggestions = [];
                let suggestionObject = jsonRes['response']['docs'];
                this.facetService.setFaets(jsonRes['facets']);
                console.log('number of search result for ' + srchObj.searchTerm + '=' + suggestionObject.length);
                let ids = [];
                suggestionObject.forEach((item) => {
                    ids.push(item.youtubevideoID);
                });
                return this.getVideos(ids);
            })).toPromise().catch(this.handleError);
    }

    searchNext(args: any): Promise<any> {
        let solrUrl = AppSettings.SOLR_SERVER_PATH + 'foodx/select';
        let params = {
            'rows': '' + AppSettings.max_results
            , 'start': '' + args['pagenum'] * AppSettings.max_results
            , 'wt': 'json'
            , 'q': 'recipeTitle:' + args['term']
            , 'json.wrf': 'JSONP_CALLBACK'
        }

        return this.http.get(solrUrl, { params: params })
            .pipe(map(jsonRes => {
                // let jsonRes = response.json();
                let suggestions = [];
                let suggestionObject = jsonRes['response']['docs'];
                let ids = [];
                this.facetService.setFaets('facets');
                suggestionObject.forEach((item) => {
                    ids.push(item.youtubevideoID);
                });

                return this.getVideos(ids);
            }))
            .toPromise()
            .catch(this.handleError)
    }

    getVideos(ids): Promise<any> {
        return this.http.get(AppSettings.base_url + 'videos?id=' + ids.join(',') + '&maxResults=' + AppSettings.max_results + '&type=video&part=snippet,contentDetails,statistics&key=' + AppSettings.YOUTUBE_API_KEY)
            .pipe(map(results => {
                return results['items'];
            }))
            .toPromise()
            .catch(this.handleError)
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }
}
