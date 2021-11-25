import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ResultAddComponent } from './components/result-add/result-add.component';
import { ResultEditComponent } from './components/result-edit/result-edit.component';
import { ResultListComponent } from './components/result-list/result-list.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';
import { ResultSearchComponent } from './components/result-search/result-search.component';
import { TeacherLoginComponent } from './components/teacher-login/teacher-login.component';
import { ResultDetailComponent } from './components/result-detail/result-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    StudentLoginComponent,
    TeacherLoginComponent,
    ResultListComponent,
    ResultAddComponent,
    ResultEditComponent,
    ResultSearchComponent,
    NotFoundComponent,
    ResultDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
