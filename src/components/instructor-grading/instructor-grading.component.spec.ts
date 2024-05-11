import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorGradingComponent } from './instructor-grading.component';

describe('InstructorGradingComponent', () => {
  let component: InstructorGradingComponent;
  let fixture: ComponentFixture<InstructorGradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorGradingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorGradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
