import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-teams-container',
  templateUrl: './teams-container.component.html',
  styleUrls: ['./teams-container.component.css'],
})
export class TeamsContainerComponent {
  showEditTeamPopup: boolean = false; // Flag to show/hide the form
  selectedTeam: any;
  teams: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchTeams();
  }

  fetchTeams() {
    this.userService.fetchTeams().subscribe({
      next: (teams) => {
        console.log(teams);
        this.teams = teams;
      },
      error: (err) => {
        console.error('Error fetching teams:', err);
      },
    });
  }

  onAddTeam() {
    this.showEditTeamPopup = true;
  }

  closeTeamPopup() {
    this.showEditTeamPopup = false;
  }
}
