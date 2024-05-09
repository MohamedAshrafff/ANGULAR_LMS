import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { UsersService } from '../../services/users.service';
import { Course } from '../../interfaces/course';
import { Observable } from 'rxjs';
import { Request } from '../../interfaces/request';
import { User, CourseInfo } from '../../interfaces/user';
import Swal from 'sweetalert2';
import { RequestsService } from '../../services/requests.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  coursesObservable: Observable<Course[]>;
  user: User | null = null;
  courseInfo: CourseInfo | null = null;
  constructor(public coursesService: CoursesService, private userService: UsersService, private req: RequestsService) {
    this.coursesObservable = this.coursesService.getCourses()
    this.user = this.userService.currentUser
  }

  checkEnrolled(course_id: string): boolean {
    if (this.user && Array.isArray(this.user.enrolled_courses)) {
      return !!this.user.enrolled_courses.find(course => course.course_id === course_id);
    }
    return false;
  }

  sendEnrollRequest(course_id: string, course_name: string) {
    if (this.user) {
      const newRequest: Request = {
        request_id: '',
        course_id: course_id,
        course_name: course_name,
        student_id: this.user?.id,
        student_name: this.user?.full_name,
      }
      this.req.addRequest(newRequest);
      this.showModal();
    }
  }

  showModal() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Course Enroll Request Sent !",
      showConfirmButton: false,
      timer: 1500
    });
  }
}
