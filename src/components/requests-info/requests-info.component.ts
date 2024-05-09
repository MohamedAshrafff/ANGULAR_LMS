import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestsService } from '../../services/requests.service';
import { Request } from '../../interfaces/request';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-requests-info',
  templateUrl: './requests-info.component.html',
  styleUrl: './requests-info.component.css'
})
export class RequestsInfoComponent {
  requestsObservable: Observable<Request[]>;
  user: User | null = null;
  isLoading: boolean = true;
  constructor(public requestsService: RequestsService, private userService: UsersService, private router: Router) {
    this.requestsObservable = this.requestsService.getRequests();
  }
  ngOnInit(): void {
    this.requestsObservable.subscribe({
      next: () => {
        this.isLoading = false; // Set isLoading to false when courses are fetched
      }
    });
  }

  acceptRequest(user_id: string, course_id: string, course_name: string, request_id: string): void {
    if (user_id) {
      this.userService.getSingleUser(user_id).subscribe(user => {
        this.user = user;
      })
      if (this.user && this.user.enrolled_courses) {
        this.user.enrolled_courses.push({ course_id: course_id, course_name: course_name, completed: 0 });
        this.userService.editUser(user_id, this.user);
        this.requestsService.deleteRequestById(request_id);
        this.router.navigate(['/actions-home']);
      }
    }
  }

  deleteRequest(id: string): void {
    this.requestsService.deleteRequestById(id);
  }

}
