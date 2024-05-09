import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { CoursesService } from '../../services/courses.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-info',
  templateUrl: './users-info.component.html',
  styleUrl: './users-info.component.css'
})
export class UsersInfoComponent {
  usersObservable: Observable<User[]>;
  isLoading: boolean = true;
  role: string = '';
  courseName: string = '';
  constructor(public usersService: UsersService, public coursesService: CoursesService) {
    this.usersObservable = this.usersService.getUsers();
  }

  ngOnInit(): void {
    this.role = this.usersService.currentUser?.role || '';
    this.usersObservable.subscribe({
      next: () => {
        this.isLoading = false;
      }
    });
  }

  DeleteUser(id: string): void {
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
        this.usersService.deleteUserId(id);
        Swal.fire({
          position: "center",
          title: "User Deleted Successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

}
