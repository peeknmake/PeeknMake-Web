import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proxy',
  template: `
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class ProxyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
