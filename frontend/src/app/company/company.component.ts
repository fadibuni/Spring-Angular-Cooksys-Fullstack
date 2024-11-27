import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent {
  email: string = '';
  role: string = '';
  companies: any[] = [];
  selectedCompany: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const user = this.userService.getUserSession();
    if (user) {
      this.email = user.email;
      this.role = user.role;

      // Fetch companies only if the user is an admin
      if (this.role === 'admin') {
        this.userService.fetchCompanies().subscribe({
          next: (companies) => {
            console.log(companies);
            this.companies = companies;
          },
          error: (err) => {
            console.error('Error fetching companies:', err);
          },
        });
      }
    } else {
      // Redirect to login if not authenticated
      this.router.navigate(['/login']);
    }
  }

  onCompanySelect() {
    if (this.selectedCompany) {
      // Save selected company ID
      this.userService.setSelectedCompany(parseInt(this.selectedCompany, 10));

      // Redirect to announcements
      this.router.navigate(['/announcements']);
    }
  }
}
