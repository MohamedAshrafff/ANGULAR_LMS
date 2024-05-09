import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../interfaces/course';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lesson-creation',
  templateUrl: './lesson-creation.component.html',
  styleUrls: ['./lesson-creation.component.css'] // Changed styleUrl to styleUrls
})
export class LessonCreationComponent {
  courseId: string | null = null;
  course: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.coursesService.getCourse(this.courseId).subscribe(course => {
        this.course = course;
      });
    }
  }

  addLesson(lessonTitle: string, lessonPdf: string, lessonVideo: string): void {
    if (this.course) {
      const newCourse: Course = {
        ...this.course,
        course_content: [
          ...(this.course.course_content || []),
          { title: lessonTitle, pdf: lessonPdf, video: lessonVideo, isCompleted: false }
        ]
      };
      this.coursesService.addLessonToCourse(newCourse.id, newCourse);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Lesson created Successfully !",
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/actions-home/' + this.courseId]);
    }

  }
}
