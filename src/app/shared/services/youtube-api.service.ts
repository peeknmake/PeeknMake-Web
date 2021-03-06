import { Injectable } from '@angular/core';
// import { Http, Response } from "@angular/http";
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {map } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { AppSettings } from '../constants';

@Injectable()
export class YoutubeApiService {

	public nextToken: string;
	public lastQuery: string;

	constructor(
		private http: HttpClient,
		private notificationService: NotificationService)
	{ }


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

		this.notificationService.showNotification(errMsg);
		return Promise.reject(errMsg);
	}
}
