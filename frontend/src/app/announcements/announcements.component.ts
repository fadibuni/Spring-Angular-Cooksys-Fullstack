import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent implements OnInit {
  announcements: any[] = [];
  isAdmin: boolean = false;
  selectedCompanyId: number | null = null;

  showModal: boolean = false;
  announcementForm = {
    title: '',
    message: '',
  };

  constructor(public http: HttpClient, public userService: UserService, public router: Router) {}

  ngOnInit(): void {
    const user = this.userService.getUserSession();
    this.selectedCompanyId = this.userService.getSelectedCompany();

    if (this.selectedCompanyId) {
      this.isAdmin = user?.role === 'admin'; // Check if the user is an admin
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
  
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  submitAnnouncement(): void {
    const newAnnouncement = {
      title: this.announcementForm.title,
      message: this.announcementForm.message,
    };

    this.createAnnouncement(newAnnouncement);
    this.closeModal();
  }
  
  createAnnouncement(newAnnouncement: { title: string; message: string }): void {
    const user = this.userService.getUserSession();
    const companyId = this.selectedCompanyId;

    if (!user || !companyId) {
      alert('User or company information is missing.');
      return;
    }

    const url = `http://localhost:8080/announcements/create/company/${companyId}/user/${user.id}`;

    this.http.post(url, newAnnouncement).subscribe({
      next: () => {
        alert('Announcement created successfully!');
        this.fetchAnnouncements(companyId); // Refresh announcements
      },
      error: (err) => {
        console.error('Error creating announcement:', err);
        alert('Failed to create announcement.');
      },
    });
  }



  logout() {
    this.userService.clearSession(); 
    this.router.navigate(['/login']); 
  }
}
