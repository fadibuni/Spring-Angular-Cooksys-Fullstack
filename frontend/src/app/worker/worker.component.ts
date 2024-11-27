import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css'],
})

export class WorkerComponent implements OnInit {
  announcements: any[] = [];
  selectedCompanyId: number | null = null;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.selectedCompanyId = this.userService.getSelectedCompany();

    if (this.selectedCompanyId) {
      this.fetchAnnouncements(this.selectedCompanyId);
    } else {
      console.error('No company selected!');
    }
  }

  fetchAnnouncements(companyId: number): void {
    this.http.get(`http://localhost:8080/company/${companyId}/announcements`).subscribe({
      next: (response: any) => {
        this.announcements = response;
      },
      error: (err) => {
        console.error('Error fetching announcements:', err);
      },
    });
  }
}
