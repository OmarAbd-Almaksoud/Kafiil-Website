import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddportfoliosComponent } from './addportfolios.component';

describe('AddportfoliosComponent', () => {
  let component: AddportfoliosComponent;
  let fixture: ComponentFixture<AddportfoliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddportfoliosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddportfoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
