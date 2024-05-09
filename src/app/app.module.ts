import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { TaskComponent } from '../components/task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from '../components/log-in/log-in.component';
import { RegisterComponent } from '../components/register/register.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { GradesComponent } from '../components/grades/grades.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { UploadDeliverableComponent } from '../components/upload-deliverable/upload-deliverable.component';
import { CourseCreationComponent } from '../components/course-creation/course-creation.component';
import { InstructorNavbarComponent } from '../components/instructor-navbar/instructor-navbar.component';
import { InstructorHomeComponent } from '../components/instructor-home/instructor-home.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { UsersInfoComponent } from '../components/users-info/users-info.component';
import { InstructorCourseDetailsComponent } from '../components/instructor-course-details/instructor-course-details.component';
import { LessonCreationComponent } from '../components/lesson-creation/lesson-creation.component';
import { UserDetailsComponent } from '../components/user-details/user-details.component';
import { RequestsInfoComponent } from '../components/requests-info/requests-info.component';
@NgModule({
  declarations: [AppComponent, HomeComponent, AddTaskComponent, TaskComponent, LogInComponent, RegisterComponent, NavbarComponent, GradesComponent, CoursesComponent, CourseDetailsComponent, NotFoundComponent, UploadDeliverableComponent, CourseCreationComponent, InstructorNavbarComponent, InstructorHomeComponent, UsersInfoComponent, InstructorCourseDetailsComponent, LessonCreationComponent, UserDetailsComponent, RequestsInfoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() =>
      initializeApp({
        "projectId": "lmsystem-3e72b",
        "appId": "1:1049684493852:web:c5a46a91f5e6a3ff5d01d9",
        "storageBucket": "lmsystem-3e72b.appspot.com",
        "apiKey": "AIzaSyBvlcvzTi8iHQeeZ264YkHLz-cwOPC9Qv0",
        "authDomain": "lmsystem-3e72b.firebaseapp.com",
        "messagingSenderId": "1049684493852"
      })),
    provideFirestore(() => getFirestore())],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule { }
