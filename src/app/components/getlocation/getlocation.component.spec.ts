import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetlocationComponent } from './getlocation.component';

describe('GetlocationComponent', () => {
  let component: GetlocationComponent;
  let fixture: ComponentFixture<GetlocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetlocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
