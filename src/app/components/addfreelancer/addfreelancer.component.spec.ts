import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfreelancerComponent } from './addfreelancer.component';

describe('AddfreelancerComponent', () => {
  let component: AddfreelancerComponent;
  let fixture: ComponentFixture<AddfreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfreelancerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddfreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
