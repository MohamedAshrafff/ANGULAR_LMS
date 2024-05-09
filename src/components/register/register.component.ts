import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) { }

  signUpForm: FormGroup | null = null;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';


  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.signUpForm) {
      if (this.userService.isEmailUnique(this.signUpForm.value.email)) {
        this.registerNewUser(this.signUpForm.value.fullName, this.signUpForm.value.password, this.signUpForm.value.email, this.signUpForm.value.role)
      }
    } else {
      console.log('Invalid form submission');
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    this.confirmPasswordFieldType = this.confirmPasswordVisible ? 'text' : 'password';
  }

  passwordMatchValidator(group: FormGroup) {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) return null;

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null; // Return null at the end
  }

  registerNewUser(name: string, password: string, email: string, role: string): void {
    const newUser: User = {
      id: '',
      full_name: name,
      email: email,
      password: password,
      role: role,
      enrolled_courses: []
    };

    this.userService.registerUser(newUser);
    // localStorage.setItem('currentUser', JSON.stringify(newUser));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Registered Successfully !",
      showConfirmButton: false,
      timer: 2000
    });
    this.router.navigate(['/log-in']);
  }

}
