import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  signInForm: FormGroup | null = null;
  passwordVisible: boolean = false;
  passwordFieldType: string = 'password';
  user: User | null = null;
  isInvalid = false

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });


  }

  onSubmit(): void {
    if (this.signInForm) {
      console.log(this.signInForm.valid);
      console.log(this.signInForm.value.email);
      console.log(this.signInForm.value.password);

      // Call checkUserInDatabase and log this.user inside the subscription
      this.checkUserInDatabase(this.signInForm.value.email, this.signInForm.value.password);
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

  onFocus(): void {
    // Set invalidLogin flag to false when input fields are focused
    this.isInvalid = false;
  }

  checkUserInDatabase(email: string, password: string) {
    this.usersService.checkUser(email, password).subscribe((user: User | null) => {
      if (user) {
        this.user = { ...user };
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('User found:', user);
      } else {
        this.user = null;
        this.isInvalid = true;
        console.log('User not found');
      }
      if (this.user?.role === 'student') {
        this.router.navigate(['/']);
      }
      else if (this.user?.role === 'instructor' || this.user?.role === 'admin') {
        this.router.navigate(['/actions-home']);
      }

    });
  }
}
