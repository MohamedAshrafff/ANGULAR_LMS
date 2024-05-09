import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course, CourseContent } from '../../interfaces/course';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructor-course-details',
  templateUrl: './instructor-course-details.component.html',
  styleUrl: './instructor-course-details.component.css'
})
export class InstructorCourseDetailsComponent {
  course: Course | null = null; // Initialize course with null
  courseId: string | null = null; // Define courseId with proper type
  completedLessons = 0;
  isLoading: boolean = true; // Added isLoading variable

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');

    if (this.courseId) {
      this.coursesService.getCourse(this.courseId).subscribe(course => {
        this.course = course;
        this.isLoading = false; // Set isLoading to false when content is fetched
      });
    }
  }

  deleteLesson(index: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.courseId && this.course) {
          this.course.course_content.splice(index, 1);
          this.coursesService.addLessonToCourse(this.courseId, this.course);
          Swal.fire({
            position: "center",
            title: "Lesson Deleted Successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });
  }
}
