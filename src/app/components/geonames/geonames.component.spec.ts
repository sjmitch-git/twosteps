import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeonamesComponent } from './geonames.component';

describe('GeonamesComponent', () => {
  let component: GeonamesComponent;
  let fixture: ComponentFixture<GeonamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeonamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeonamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
