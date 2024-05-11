import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../interfaces/course';
import { CoursesService } from '../../services/courses.service';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-instructor-home',
  templateUrl: './instructor-home.component.html',
  styleUrl: './instructor-home.component.css'
})
export class InstructorHomeComponent {
  coursesObservable: Observable<Course[]>;
  isLoading: boolean = true;
  constructor(public coursesService: CoursesService, private userService: UsersService) {
    this.coursesObservable = this.coursesService.getCourses()
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      console.log("FOUND")
      this.userService.currentUser = JSON.parse(storedUser);
    }
    this.coursesObservable.subscribe({
      next: () => {
        this.isLoading = false; // Set isLoading to false when courses are fetched
      }
    });
  }

  deleteCourse(id: string): void {
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
        this.coursesService.deleteCourseById(id);
        Swal.fire({
          position: "center",
          title: "Course Deleted Successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
}
