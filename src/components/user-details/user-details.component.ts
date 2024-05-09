import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../interfaces/course';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  user: User | null = null; // Initialize course with null
  userId: string | null = null; // Define courseId with proper type
  constructor(public coursesService: CoursesService, private userService: UsersService, private route: ActivatedRoute,
  ) { }
  courses: Course[] = [];
  completedLessons: number[] = [];
  enrolledCourseIds: string[] = [];

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getStudentCourses();
  }

  getStudentCourses() {
    if (this.userId) {
      this.userService.getSingleUser(this.userId).subscribe(user => {
        this.user = user
        this.enrolledCourseIds = this.user?.enrolled_courses.map(course => course.course_id) || [];
        this.completedLessons = this.user?.enrolled_courses.map(course => course.completed) || [];
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
      )
    }
  }

  getPercentage(index: number) {
    return Math.round(this.completedLessons[index] / this.courses[index].course_content.length * 100);
  }
}
