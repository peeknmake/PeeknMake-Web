import { Component, Input, AfterContentInit, Output, EventEmitter } from "@angular/core";
import { YoutubePlayerService } from "../../shared/services/youtube-player.service";
import { NotificationService } from '../../shared/services/notification.service';

@Component({
	selector: 'video-player',
	templateUrl: 'video-player.component.html',
	styleUrls: ['video-player.component.css']
})

export class VideoPlayerComponent implements AfterContentInit {
	public minPlayer: boolean = false;
	public superMinPlayer: boolean = true;
	public playingEvent: string = 'pause';
	private shuffle: boolean = false;
	private repeat: boolean = false;
	private fullscreenActive: boolean = false;

	public showPlayer:boolean = true;

	@Output() repeatActive = new EventEmitter();
	@Output() shuffleActive = new EventEmitter();
	@Output() nextVideoEvent = new EventEmitter();
	@Output() prevVideoEvent = new EventEmitter();
	@Output() playFirstInPlaylist = new EventEmitter();
	@Output() clearPlaylist = new EventEmitter();
	@Output() exportPlaylist = new EventEmitter();
	@Output() importPlaylist = new EventEmitter();
	@Output() closePlaylist = new EventEmitter();

	constructor(
		private youtubePlayer: YoutubePlayerService,
		private notificationService: NotificationService) {
		this.youtubePlayer.playPauseEvent.subscribe(event => {
			this.superMinPlayer = !this.superMinPlayer;
			this.playingEvent = event
		});
	}

	ngAfterContentInit() {
		let doc = window.document;
		let playerApi = doc.createElement('script');
		playerApi.type = 'text/javascript';
		playerApi.src = 'https://www.youtube.com/iframe_api';
		doc.body.appendChild(playerApi);
		this.youtubePlayer.createPlayer();
	}

	toggleFullscreen(): void {
		console.log(" toggle fullscreen called ");
		this.minPlayer = false;
		this.superMinPlayer = false;
		this.fullscreenActive = !this.fullscreenActive;
		let width = this.fullscreenActive ? window.innerWidth - 70 : 440;
		let height = this.fullscreenActive ? window.innerHeight - 120 : 250;
		this.youtubePlayer.resizePlayer(width, height);

	}

	playPause(event: string): void {
		this.playingEvent = event;
		if (!this.youtubePlayer.getCurrentVideo()) {
			this.playFirstInPlaylist.emit();
			return;
		}
		event === 'pause' ? this.youtubePlayer.pausePlayingVideo() : this.youtubePlayer.playPausedVideo();
	}

	nextVideo(): void {
		this.nextVideoEvent.emit();
	}

	prevVideo(): void {
		this.prevVideoEvent.emit();
	}

	togglePlayer(): void {
		this.minPlayer = !this.minPlayer;
		this.superMinPlayer = false;
	}

	minimizePlayer(): void {
		this.superMinPlayer = !this.superMinPlayer;
	}
	
	closePlayer(): void {
		this.youtubePlayer.playVideo('');
	}

	toggleRepeat(): void {
		this.repeat = !this.repeat;
		this.shuffle = false;
		this.repeatActive.emit(this.repeat);
	}

	toggleShuffle(): void {
		this.shuffle = !this.shuffle;
		this.repeat = false;
		this.shuffleActive.emit(this.shuffle);
	}

	openClosedPlaylist(): void {
		this.closePlaylist.emit();
	}

	clearPlaylistAction(): void {
		this.clearPlaylist.emit();
	}

	exportPlaylistAction(): void {
		this.exportPlaylist.emit();
	}

	importPlaylistAction(): void {
		let import_button = document.getElementById('import_button');
		import_button.click();
	}

	handleInputChange(e: any): void {
		let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
		if (file.type !== 'application/json') {
			this.notificationService.showNotification("File not supported.");
			return;
		}
		let reader = new FileReader();
		let me = this;
		reader.readAsText(file);
		reader.onload = function (ev) {
			let list;
			try {
				list = JSON.parse(ev.target['result']);
			} catch (exc) {
				list = null;
			}
			if (!list) {
				me.notificationService.showNotification("Playlist not valid.");
				return;
			}
			if (list.length < 1) {
				me.notificationService.showNotification("Nothing to import.");
				return;
			}
			me.importPlaylist.emit(list);
			me.notificationService.showNotification("Playlist imported.");
			document.getElementById('import_button')['value'] = "";
		}
	}
}
