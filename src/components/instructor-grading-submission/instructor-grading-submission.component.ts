import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Submission } from '../../interfaces/submissions';
import { SubmissionsService } from '../../services/submissions.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../interfaces/course';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-instructor-grading-submission',
  templateUrl: './instructor-grading-submission.component.html',
  styleUrl: './instructor-grading-submission.component.css'
})
export class InstructorGradingSubmissionComponent {
  submissionId: string | null = null;
  submission: Submission | null = null;

  constructor(
    private route: ActivatedRoute,
    private submissionsService: SubmissionsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.submissionId = this.route.snapshot.paramMap.get('id');
    if (this.submissionId) {
      this.submissionsService.getSubmission(this.submissionId).subscribe(submission => {
        this.submission = submission;
      });
    }
  }

  submitDeliverable(grade: string): void {
    if (this.submission) {
      const newSubmission: Submission = {
        ...this.submission,
        grade: grade,
        status: 'Graded'
      };
      this.submissionsService.editSubmission(newSubmission.id, newSubmission);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Submission Graded Successfully !",
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/instructor-grading']);
    }

  }
}
