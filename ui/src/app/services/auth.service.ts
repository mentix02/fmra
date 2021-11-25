import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { Credentials, Role } from '../shared/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  role?: Role;
  token?: string;
  isAuthenticated: boolean;

  private endpoint = 'http://localhost:3000/api/v1/users/login';

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: LocalStorageService
  ) {
    this.isAuthenticated = !!this.storageService.get('token');
    this.token = this.storageService.get('token') || undefined;
    this.role = this.stringToRole(this.storageService.get('role'));
  }

  stringToRole = (role: string | null): Role =>
    role && role === 'teacher' ? Role.TEACHER : Role.STUDENT;

  getToken = (credentials: Credentials, role: Role) =>
    this.http.post(`${this.endpoint}/${role}`, credentials);

  signIn(token: string, role: Role) {
    this.role = role;
    this.token = token;
    this.isAuthenticated = true;
    this.storageService.set('role', role);
    this.storageService.set('token', token);
    this.router.navigate(['/']);
  }

  signOut() {
    this.storageService.clear();
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }
}
