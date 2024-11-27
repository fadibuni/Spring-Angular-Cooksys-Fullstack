import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/services/user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  isAdmin: boolean = false;
  selectedCompanyId: number | null = null;
  newUser = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    admin: '',
  }
  modNewUser = {
    "credentials": {
      "username": "",
      "password": ""
    },
    "profile": {
      "firstName": "",
      "lastName": "",
      "email": "",
      "phone": ""
    },
    "admin": ""
  }
  showNewUserModal: boolean = false;

  constructor(public http: HttpClient, public userService: UserService, public router: Router) {}

  ngOnInit(): void {
    const user = this.userService.getUserSession();
    this.selectedCompanyId = this.userService.getSelectedCompany();

    if (this.selectedCompanyId) {
      this.isAdmin = user?.role === 'admin';
      this.fetchUsers(this.selectedCompanyId);
    } else {
      console.error('No company selected!');
    }
  }

  fetchUsers(companyId: number): void {
    this.http.get(`http://localhost:8080/company/${companyId}/users`).subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  logout() {
    this.userService.clearSession(); 
    this.router.navigate(['/login']);
  }

  openNewUserModal(): void {
    this.showNewUserModal = true;
  }

  closeNewUserModal(): void {
    this.showNewUserModal = false;
  }


createUser(): void {
  const companyId = this.selectedCompanyId;
  if (companyId && this.newUser.firstName && this.newUser.lastName && this.newUser.email && this.newUser.password && this.newUser.confirmPassword) {
    if (this.newUser.password !== this.newUser.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const url = `http://localhost:8080/users/${companyId}`;

    this.modNewUser = {
        "credentials": {
          "username": this.newUser.firstName + this.newUser.lastName,
          "password": this.newUser.password
        },
        "profile": {
          "firstName": this.newUser.firstName,
          "lastName": this.newUser.lastName,
          "email": this.newUser.email,
          "phone": this.newUser.phone
        },
        "admin": this.newUser.admin
    }



    this.http.post(url, this.modNewUser).subscribe({
      next: () => {
        alert('User created successfully!');
        this.fetchUsers(companyId);
        this.closeNewUserModal();
      },
      error: (err) => {
        console.error('Error creating user:', err);
        alert('Failed to create user.');
      },
    });
  } else {
    alert('Fill in all user details.');
  }
}
}