import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course, CourseContent } from '../../interfaces/course';
import { UsersService } from '../../services/users.service';
import { CourseInfo, User } from '../../interfaces/user';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'] // Corrected property name
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null; // Initialize course with null
  courseId: string | null = null; // Define courseId with proper type
  completedLessons = 0;
  user: User | null = null;
  userId: string | null = null;
  isLoading: boolean = true; // Added isLoading variable
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.coursesService.getCourse(this.courseId).subscribe(course => {
        this.course = course;
        this.completedLessons = this.userService.currentUser?.enrolled_courses.find(course => course.course_id === this.courseId)?.completed || 0;
        this.user = this.userService.currentUser;
        this.updateCompletedFromDB();
        this.getCompletedLessonCount(); // Calculate completed lessons initially
        this.isLoading = false; // Set isLoading to false when content is fetched
      });
    }
  }

  getCompletedLessonCount(): void {
    if (this.course && this.course.course_content) {
      this.completedLessons = this.course.course_content.filter((lesson: CourseContent) => lesson.isCompleted).length;
    } else {
      this.completedLessons = 0;
    }
  }

  updateCompletedFromDB() {
    if (this.course && this.course.course_content) {
      for (let i = 0; i < this.course.course_content.length; i++) {
        if (this.completedLessons === 0) {
          break; // Exit the loop if completedLessons becomes 0
        }
        this.course.course_content[i].isCompleted = true;
        this.completedLessons--; // Decrement completedLessons
      }
    }
  }


  updateCompletedLessonCount(i: number): void {
    if (this.course && this.course.course_content) {
      this.course.course_content[i].isCompleted = !this.course?.course_content[i].isCompleted;
    }
  }

  getCompletedLessonPercentage(): number {
    if (this.course && this.course.course_content && this.course.course_content.length > 0) {
      const completedLessonCount = this.course.course_content.filter((lesson: CourseContent) => lesson.isCompleted).length;
      return +(completedLessonCount / this.course.course_content.length * 100).toFixed(2); // Applying toFixed(2) to the result
    } else {
      return 0;
    }
  }

  saveProgress(): void {
    const completedLessonCount = this.course?.course_content.filter((lesson: CourseContent) => lesson.isCompleted).length;

    if (this.user && this.user.enrolled_courses) {
      this.user.enrolled_courses = this.user.enrolled_courses.map(course => {
        if (course.course_id === this.courseId) {
          // Explicitly cast completed to number | undefined
          return { ...course, completed: completedLessonCount !== undefined ? completedLessonCount : undefined } as CourseInfo;
        }
        return course;
      });
      Swal.fire({
        position: "center",
        title: "Progress Saved.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
      this.userService.editUser(this.user?.id, this.user);
    }
  }

}
