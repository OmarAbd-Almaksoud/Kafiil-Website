import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPortfoliosComponent } from './details-portfolios.component';

describe('DetailsPortfoliosComponent', () => {
  let component: DetailsPortfoliosComponent;
  let fixture: ComponentFixture<DetailsPortfoliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPortfoliosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPortfoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
