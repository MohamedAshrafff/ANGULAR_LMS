import { Component, OnInit } from '@angular/core';
import { SubmissionsService } from '../../services/submissions.service';
import { Submission } from '../../interfaces/submissions';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent {
  submissionsObservable: Observable<Submission[]>;
  submissions: Submission[] = [];
  isLoading: boolean = true;

  constructor(public submissionsService: SubmissionsService, private userService: UsersService) {
    this.submissionsObservable = this.submissionsService.getSubmissions();
  }

  ngOnInit(): void {
    this.submissionsObservable.subscribe({
      next: (submissions: Submission[]) => {
        if (this.userService.currentUser) {
          if (this.userService.currentUser.id) {
            const id = this.userService.currentUser.id;
            this.submissions = submissions.filter(submission => submission.student_id === id);
          }
        }
        this.isLoading = false;
      }
    });
  }



}
