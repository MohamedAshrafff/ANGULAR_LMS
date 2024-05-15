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
  selector: 'app-upload-deliverable',
  templateUrl: './upload-deliverable.component.html',
  styleUrl: './upload-deliverable.component.css'
})
export class UploadDeliverableComponent {
  course: Course | null = null; // Initialize course with null
  courseId: string | null = null; // Define courseId with proper type
  user: User | null = null;
  constructor(private route: ActivatedRoute,
    private submissionsService: SubmissionsService,
    private router: Router,
    private coursesService: CoursesService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.coursesService.getCourse(this.courseId).subscribe(course => {
        this.course = course;
        this.user = this.userService.currentUser;
      });
    }
  }

  submitDeliverable(sub_link: string, sub_title: string): void {
    if (!sub_link || !sub_title) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fill all feilds !",
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    if (this.user && this.course) {
      const newSubmisson: Submission = {
        id: '',
        course_name: this.course?.course_name,
        status: 'Under Review',
        student_id: this.user?.id,
        submission_link: sub_link,
        submission_title: sub_title,
        grade: '-'
      };
      this.submissionsService.addSubmission(newSubmisson);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Submitted Successfully !",
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/grades/']);
    }
  }
}
