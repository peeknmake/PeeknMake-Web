import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMapviewComponent } from './main-mapview.component';

describe('MainMapviewComponent', () => {
  let component: MainMapviewComponent;
  let fixture: ComponentFixture<MainMapviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMapviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMapviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
