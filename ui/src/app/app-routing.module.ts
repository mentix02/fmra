import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentGuard } from './guards/student.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { UnauthorizedGuard } from './guards/unauthorized.guard';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ResultAddComponent } from './components/result-add/result-add.component';
import { ResultListComponent } from './components/result-list/result-list.component';
import { ResultEditComponent } from './components/result-edit/result-edit.component';
import { ResultSearchComponent } from './components/result-search/result-search.component';
import { TeacherLoginComponent } from './components/teacher-login/teacher-login.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';

const routes: Routes = [
  // Home
  { path: '', component: HomeComponent },
  // Login
  {
    path: 'login/student',
    component: StudentLoginComponent,
    canActivate: [UnauthorizedGuard],
  },
  {
    path: 'login/teacher',
    component: TeacherLoginComponent,
    canActivate: [UnauthorizedGuard],
  },
  // Teacher result routes
  {
    path: 'results/add',
    component: ResultAddComponent,
    canActivate: [TeacherGuard],
  },
  {
    path: 'results/list',
    component: ResultListComponent,
    canActivate: [TeacherGuard],
  },
  {
    path: 'results/edit/:rollno',
    component: ResultEditComponent,
    canActivate: [TeacherGuard],
  },
  // Student result routes
  {
    path: 'results/search',
    component: ResultSearchComponent,
    canActivate: [StudentGuard],
  },
  // Wildcard 404
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
