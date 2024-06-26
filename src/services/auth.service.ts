import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsersService } from './users.service';

interface RouteData {
  allowedRoles: string[];
  // You can add other properties if needed
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private userService: UsersService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const data = next.data as RouteData;
    const allowedRoles = data.allowedRoles;

    if (this.userService.currentUser) console.log(this.userService.currentUser.role)
    else console.log("no user")
    if (this.userService.currentUser && allowedRoles.includes(this.userService.currentUser.role)) {
      console.log(this.userService.currentUser.role)
      return true; // User is authenticated and has the required role, allow access
    } else {
      // User is not authenticated or does not have the required role, redirect to login page
      this.router.navigate(['log-in']);
      return false;
    }
  }
}
