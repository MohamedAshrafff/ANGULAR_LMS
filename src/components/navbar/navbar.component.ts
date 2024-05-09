import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
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