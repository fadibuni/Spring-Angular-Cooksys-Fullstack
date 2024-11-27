import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css'],
})
export class TeamCardComponent {
  @Input() team: any;
  constructor(private router: Router) {}

  navigateToTeam(): void {
    console.log('Navigating to team:', this.team); // Log the team data
    this.router.navigate(['/projects', this.team.id], {
      state: { teamId: this.team.id, teamName: this.team.name },
    });
  }
}
