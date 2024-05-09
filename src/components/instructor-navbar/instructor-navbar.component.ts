import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-instructor-navbar',
  templateUrl: './instructor-navbar.component.html',
  styleUrl: './instructor-navbar.component.css'
})
export class InstructorNavbarComponent {
  currentUser: any = null;
  constructor(private router: Router, private userService: UsersService) { }
  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
  }
  isLinkActive(path: string): boolean {
    return this.router.url === path;
  }
  Logout() {
    this.userService.Logout();
  }
}
