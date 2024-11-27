import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit{
  email: string = '';
  password: string = '';

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private http: HttpClient, private router: Router, private userService: UserService){}
  ngOnInit(): void {
    const user = this.userService.getUserSession();
    if(user){
      this.isLoggedIn = true;
      this.isAdmin = user.role === 'admin';
    }
  }

  login(){
    const loginPL = {email: this.email, password: this.password};

    this.http.post('http://localhost:8080/users/login', loginPL).subscribe({
      next: (response: any) => {
        console.log(response);

        //extracting some info
        const user = {
          id: response.id,
          firstName: response.profile.firstName,
          lastName: response.profile.lastName,
          email: response.profile.email,
          role: response.admin ? 'admin' : 'worker',
        };

        // Save user session using the service
        this.userService.setUserSession(user);

        this.isLoggedIn = true;
        this.isAdmin = user.role === 'admin';


        // Redirect based on user role
        if (user.role === 'admin') {
          this.router.navigate(['/company']);
        } else {
          this.router.navigate(['/worker']);
        }
      },
      error: (err) => {
        console.log(err);
        alert('login failed, please try again');
      },
    });
  }


}
