import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindcategoryComponent } from './findcategory.component';

describe('FindcategoryComponent', () => {
  let component: FindcategoryComponent;
  let fixture: ComponentFixture<FindcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
