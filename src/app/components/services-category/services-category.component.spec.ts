import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesCategoryComponent } from './services-category.component';

describe('ServicesCategoryComponent', () => {
  let component: ServicesCategoryComponent;
  let fixture: ComponentFixture<ServicesCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
