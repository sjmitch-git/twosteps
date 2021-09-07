import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetnearbyComponent } from './getnearby.component';

describe('GetnearbyComponent', () => {
  let component: GetnearbyComponent;
  let fixture: ComponentFixture<GetnearbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetnearbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetnearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
