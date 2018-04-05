import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-h-video',
    template: `
    <div class="video-component" >
      <div class="mdl-card__title mdl-card--expand" [ngStyle]="{'background': '#000 url(' + video.snippet.thumbnails.high.url + ') center center no-repeat', 'background-size': '90%'}">
      </div>
      <div class="video-informations">
        {{ video.snippet.title }}
      </div>
    </div>
  `,
    styles: ['.video-component {height:100%;display:grid;padding-top:2px; grid-template-columns: 2fr 2fr; grid-gap:5px}',]
})
export class HVideoComponent implements OnInit {

    public shadow=2;
    @Input() video;
    constructor() { }

    ngOnInit() {
    }

}
