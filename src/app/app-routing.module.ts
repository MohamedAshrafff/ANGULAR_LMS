import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { TaskComponent } from '../components/task/task.component';
import { LogInComponent } from '../components/log-in/log-in.component';
import { RegisterComponent } from '../components/register/register.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { GradesComponent } from '../components/grades/grades.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { UploadDeliverableComponent } from '../components/upload-deliverable/upload-deliverable.component';
import { CourseCreationComponent } from '../components/course-creation/course-creation.component';
import { InstructorHomeComponent } from '../components/instructor-home/instructor-home.component';
import { UsersInfoComponent } from '../components/users-info/users-info.component';
import { InstructorCourseDetailsComponent } from '../components/instructor-course-details/instructor-course-details.component';
import { LessonCreationComponent } from '../components/lesson-creation/lesson-creation.component';
import { UserDetailsComponent } from '../components/user-details/user-details.component';
import { AuthService } from '../services/auth.service';
import { RequestsInfoComponent } from '../components/requests-info/requests-info.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthService], data: { allowedRoles: ['student', 'admin'] } }, // Redirect to 'log-in' path when the root path is accessed
  { path: 'log-in', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthService], data: { allowedRoles: ['student'] } },
  { path: 'courses/:id', component: CourseDetailsComponent, canActivate: [AuthService], data: { allowedRoles: ['student'] } },
  { path: 'courses/:id/upload', component: UploadDeliverableComponent, canActivate: [AuthService], data: { allowedRoles: ['student'] } },
  { path: 'actions-home', component: InstructorHomeComponent, canActivate: [AuthService], data: { allowedRoles: ['admin', 'instructor'] } },
  { path: 'actions-home/course-creation', component: CourseCreationComponent, canActivate: [AuthService], data: { allowedRoles: ['admin', 'instructor'] } },
  { path: 'actions-home/:id', component: InstructorCourseDetailsComponent, canActivate: [AuthService], data: { allowedRoles: ['admin', 'instructor'] } },
  { path: 'actions-home/:id/lesson-creation', component: LessonCreationComponent, canActivate: [AuthService], data: { allowedRoles: ['admin', 'instructor'] } },
  { path: 'users-info', component: UsersInfoComponent, canActivate: [AuthService], data: { allowedRoles: ['admin', 'instructor'] } },
  { path: 'users-info/:id', component: UserDetailsComponent, canActivate: [AuthService], data: { allowedRoles: ['admin', 'instructor'] } },
  { path: 'requests-info', component: RequestsInfoComponent, canActivate: [AuthService], data: { allowedRoles: ['admin',] } },
  { path: 'grades', component: GradesComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }, // Redirect to 'not-found' for any other unknown paths
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
