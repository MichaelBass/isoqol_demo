import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOverlayComponent } from './home-overlay.component';

describe('HomeOverlayComponent', () => {
  let component: HomeOverlayComponent;
  let fixture: ComponentFixture<HomeOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
