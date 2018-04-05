import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { NotificationService } from './notification.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { } from '@types/youtube';

@Injectable()
export class YoutubePlayerService {
	public yt_player;
	public isPlayerStarted = false;
	private currentVideoId: string;
	private api: ReplaySubject<YT.Player>;
	@Output() videoChangeEvent: EventEmitter<any> = new EventEmitter(true);
	@Output() playPauseEvent: EventEmitter<any> = new EventEmitter(true);

	static get win() {
		return window;
	}

	constructor(public notificationService: NotificationService) {
	}
	createPlayer(): void {
		let ytOptions = Object.assign({}, {
			width: 440,
			height: 250,
			videoId: '',
			playerVars: { iv_load_policy: 3, rel: 0 }
		}, {
			events: { onStateChange: (ev) => { this.onPlayerStateChange(ev); } }
			});
		let interval = setInterval(() => {
			if ((typeof window['YT'] !== "undefined") && window['YT'] && window['YT'].Player) {
				this.yt_player = new YT.Player('yt-player', ytOptions);
				clearInterval(interval);
			}
		}, 100);
	}

	onPlayerStateChange(event: any) {
		const state = event.data;
		switch (state) {
			case 0:
				this.videoChangeEvent.emit(true);
				this.playPauseEvent.emit('pause');
				break;
			case 1:
				this.playPauseEvent.emit('play');
				break;
			case 2:
				this.playPauseEvent.emit('pause');
				break;
		}
	}

	playVideo(videoId: string): void {
		console.log("from playVideo - Going to start playing a video");
		this.isPlayerStarted = true;
		if (!this.yt_player) {
			this.notificationService.showNotification("Player not ready.");
			return;
		}

		this.yt_player.loadVideoById(videoId);
		this.currentVideoId = videoId;
	}

	pausePlayingVideo(): void {
		this.yt_player.pauseVideo();
	}

	playPausedVideo(): void {
		this.yt_player.playVideo();
	}

	getCurrentVideo(): string {
		return this.currentVideoId;
	}

	resizePlayer(width: number, height: number) {
		this.yt_player.setSize(width, height);
	}

}