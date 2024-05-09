import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../interfaces/course';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-course-creation',
  templateUrl: './course-creation.component.html',
  styleUrl: './course-creation.component.css'
})
export class CourseCreationComponent {
  course: Course | null = null; // Initialize course with null
  constructor(private coursesService: CoursesService) { }

  createCourse(courseId: string, courseName: string, instructorName: string, courseTag: string): void {
    const newCourse: Course = {
      id: courseId, // Assuming id is of type string
      course_id: courseId,
      course_name: courseName,
      instructor_name: instructorName,
      course_tag: courseTag,
      course_image: '', // You can add course image logic here if needed
      course_content: [] // Assuming this is an array of course content
    };

    this.coursesService.addCourse(newCourse);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Course Created Successfully !",
      showConfirmButton: false,
      timer: 2000
    });

  }


}
