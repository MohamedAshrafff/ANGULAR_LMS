import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../interfaces/course';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { CourseInfo } from '../../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Corrected property name
})
export class HomeComponent implements OnInit {
  coursesObservable: Observable<Course[]>;
  courses: Course[] = [];
  isLoading: boolean = true; // Added isLoading variable
  enrolledCourseIds: string[] = [];

  constructor(public coursesService: CoursesService, private userService: UsersService) {
    this.coursesObservable = this.coursesService.getCourses();
  }

  getStudentCourses() {
    if (this.userService.currentUser) {
      this.enrolledCourseIds = this.userService.currentUser.enrolled_courses.map(course => course.course_id);

      this.enrolledCourseIds.forEach(courseId => {
        this.coursesService.getCourse(courseId).subscribe({
          next: (course: Course | null) => {
            if (course) {
              this.courses.push(course); // Push the fetched course into the courses array
            } else {
              console.error(`Course with ID ${courseId} not found.`);
            }
          },
          error: (error) => {
            console.error('Error fetching course:', error);
          }
        });
      });
    }
  }
  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.userService.currentUser = JSON.parse(storedUser);
    }

    this.getStudentCourses();
    this.coursesObservable.subscribe({
      next: () => {
        this.isLoading = false; // Set isLoading to false when courses are fetched
      }
    });

  }
}
