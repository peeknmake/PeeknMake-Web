import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'app-search',
    template: `
  <div class="example-container" [class.example-is-mobile]="mobileQuery.matches" >
  <mat-toolbar color="primary" class="example-toolbar">
  <mat-toolbar-row>
    <button mat-icon-button (click)="snav.toggle()"><mat-icon>menu</mat-icon></button>
    <app-go-home-component class="sns-go-home"></app-go-home-component>
    <nav class="mdl-navigation" style="width: 70%;">
        <solr-search #search (videosUpdated)="handleSearchVideo($event)" [loadingInProgress]="loadingInProgress" style="width: 100%;"></solr-search>
    </nav>
    <span class="header-spacer"></span>
    <app-user-information></app-user-information>
    </mat-toolbar-row>
  </mat-toolbar>

  <mat-sidenav-container class="example-sidenav-container"
                         [style.marginTop.px]="mobileQuery.matches ? 56 : 0">
    <mat-sidenav class="sidenavbox" #snav [mode]="mobileQuery.matches ? 'over' : 'side'"
                 [fixedInViewport]="mobileQuery.matches" fixedTopGap="56">
    <mat-nav-list>
        <a mat-list-item routerLink="." *ngFor="let nav of fillerNav">{{nav}}</a>
    </mat-nav-list>
    </mat-sidenav>

    <mat-sidenav-content>
      <p *ngFor="let content of fillerContent">{{content}}</p>
    </mat-sidenav-content>
  </mat-sidenav-container>
</div>
  `,
    styles: []
})
export class SearchComponent {

    mobileQuery: MediaQueryList;
    fillerNav = Array(50).fill(0).map((_, i) => `Nav Item ${i + 1}`);
    fillerContent = Array(50).fill(0).map(() =>
        `some test text.`);
    private _mobileQueryListener: () => void;
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}
