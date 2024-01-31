import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenerComponent } from './screener.component';

describe('ScreenerComponent', () => {
  let component: ScreenerComponent;
  let fixture: ComponentFixture<ScreenerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenerComponent]
    });
    fixture = TestBed.createComponent(ScreenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
