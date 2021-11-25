import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Credentials, Role } from '../../shared/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
})
export class StudentLoginComponent implements OnInit {
  error?: string;
  form: FormGroup = this.formBuilder.group({
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
  role: Role = Role.STUDENT;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  closeError() {
    delete this.error;
  }

  submit(): void {
    this.authService
      .getToken(this.form?.getRawValue() as Credentials, this.role)
      .subscribe({
        next: ({ token }: any) => this.authService.signIn(token, this.role),
        error: () => (this.error = 'Invalid credentials.'),
      });
  }
}
