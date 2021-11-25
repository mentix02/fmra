import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Router,
  UrlTree,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

import { Role } from '../shared/user';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['login/student']);
      return false;
    }
    return this.authService.role === Role.STUDENT;
  }
}
