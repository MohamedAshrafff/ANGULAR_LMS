import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorGradingSubmissionComponent } from './instructor-grading-submission.component';

describe('InstructorGradingSubmissionComponent', () => {
  let component: InstructorGradingSubmissionComponent;
  let fixture: ComponentFixture<InstructorGradingSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorGradingSubmissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorGradingSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
