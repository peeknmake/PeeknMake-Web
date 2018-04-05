import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HVideoComponent } from './h-video.component';

describe('HVideoComponent', () => {
  let component: HVideoComponent;
  let fixture: ComponentFixture<HVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
