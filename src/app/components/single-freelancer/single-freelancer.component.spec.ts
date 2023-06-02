import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFreelancerComponent } from './single-freelancer.component';

describe('SingleFreelancerComponent', () => {
  let component: SingleFreelancerComponent;
  let fixture: ComponentFixture<SingleFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleFreelancerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
