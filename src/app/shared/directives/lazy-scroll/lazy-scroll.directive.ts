import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Directive({
	selector: '[LazyScroll]',
	host: {
		'(window:scroll)': 'onScroll($event)'
	}
})
export class LazyScroll {
	public _element: any;
	public _count: number;

	@Input('ScrollDistance') scrollTrigger: number;
	@Output() OnScrollMethod = new EventEmitter<any>();

	constructor(public element: ElementRef) {
		this._element = this.element.nativeElement;
		if (!this.scrollTrigger) {
			this.scrollTrigger = 1;
		}
	}

	onScroll() {

		let windowHeight = "innerHeight" in window ? window.innerHeight
			: document.documentElement.offsetHeight;
		let body = document.body, html = document.documentElement;
		let docHeight = Math.max(body.scrollHeight,
			body.offsetHeight, html.clientHeight,
			html.scrollHeight, html.offsetHeight);
		let windowBottom = windowHeight + window.pageYOffset;


		if (windowBottom >= docHeight) {
			console.log('bottom reached');
			this.OnScrollMethod.emit(null);
		}
	}
}