import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: any = null;
  isAdmin: boolean = false;
  
  constructor(public userService: UserService, public router: Router) {}
  ngOnInit(): void {
    // Get user session details
    this.user = this.userService.getUserSession();

    // Check if the user is an admin
    this.isAdmin = this.user?.role === 'admin';
  }
  logout() {
    this.userService.clearSession();
    this.router.navigate(['/login']);
  }
}
