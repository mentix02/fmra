import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Role } from '../../shared/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      if (this.authService.role === Role.TEACHER)
        this.router.navigate(['results/list']);
      else if (this.authService.role === Role.STUDENT)
        this.router.navigate(['results/search']);
    }
  }
}
