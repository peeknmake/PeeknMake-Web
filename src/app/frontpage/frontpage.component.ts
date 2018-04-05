import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IndexDataService } from '../shared/services/indexDataService';
import { AuthService } from '../auth/auth.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    host: { '(document:click)': 'onClick($event)', },
    selector: 'app-frontpage',
    templateUrl: './frontpage.component.html',
    styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent {

    private stateCtrl: FormControl;
    private filteredStates: any;
    private items: string[];
    public showSuggestDropDown = false;
    public searchForm = this.fb.group({ query: ["", Validators.required] });
    public searchtype : number;
    private searchtypes = ['ingredients', 'recipe titles', 'Advanced'];
    private _suggestTimeout = null;

    constructor(public fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private solrService: IndexDataService,
        private authService: AuthService
    ) {
        this.stateCtrl = new FormControl();
        this.filteredStates = this.stateCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterStates(name));
    }
    public suggest(term: string) {
        if (this._suggestTimeout) { 
            window.clearTimeout(this._suggestTimeout);
        }
        this._suggestTimeout = window.setTimeout(() => {
            this._suggestTimeout = null;
            this.solrService.suggest(term).then(items => {
                this.items = items;
            });
        }, 200);
    }

    public onSearchInputClick() {
        this.showSuggestDropDown = true;
    }

    public searchItemSelected(item: any) {
        this.searchForm.value.query = item;
        this.showSuggestDropDown = false;
        this.gotoSearch();

    }

    filterStates(val: string) {
        return val ? this.searchtypes.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
            : this.searchtypes;
    }

    gotoSearch() {
        let searchTerm = this.searchForm.value.query;
        this.router.navigate(['/search', { recipe: searchTerm }]);
    }

    onClick(event) {
        if (this.showSuggestDropDown == false) return 0;
        let element = document.getElementById('search');
        if (!element.contains(event.target)) {
            this.showSuggestDropDown = false;
            console.log(" clicked outside");
        }
    }
}
