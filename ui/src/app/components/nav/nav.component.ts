import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: ['.clickable { cursor: pointer }'],
})
export class NavComponent implements OnInit {
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {}

  signOut() {
    this.authService.signOut();
  }
}
