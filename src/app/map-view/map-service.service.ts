import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class MapServiceService {

  constructor() { }

  private circleMovedSrc = new Subject<string>();
  private missionAnnounced$ = this.circleMovedSrc.asObservable();


}
