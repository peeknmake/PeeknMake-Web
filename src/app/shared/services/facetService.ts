import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class FacetService {

    private facetSource = new Subject<any>();
    facet$ = this.facetSource.asObservable();

    setFaets(facet: any) {
        this.facetSource.next(facet);
        console.log(this.facetSource);
    }

}