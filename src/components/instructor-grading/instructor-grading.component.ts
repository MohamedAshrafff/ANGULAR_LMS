import { Component, OnInit } from '@angular/core';
import { SubmissionsService } from '../../services/submissions.service';
import { Submission } from '../../interfaces/submissions';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-instructor-grading',
  templateUrl: './instructor-grading.component.html',
  styleUrl: './instructor-grading.component.css'
})
export class InstructorGradingComponent {
  submissionsObservable: Observable<Submission[]>;
  submissions: Submission[] = [];

  constructor(public submissionsService: SubmissionsService, private userService: UsersService) {
    this.submissionsObservable = this.submissionsService.getSubmissions();
  }

  ngOnInit(): void {
    this.submissionsObservable.subscribe({
      next: (submissions: Submission[]) => {
        this.submissions = submissions
      }
    });
  }
}
