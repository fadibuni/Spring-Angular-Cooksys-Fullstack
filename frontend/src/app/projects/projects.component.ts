import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  teamName: string = '';
  teamId: number | null = null;
  isAdmin: boolean = false;

  showNewProjectPopup: boolean = false;
  showEditProjectPopup: boolean = false;
  selectedProject: any = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.userService.getUserSession();
    this.isAdmin = user?.role === 'admin';
  
    // Check for state data passed in from the team-card on click
    const state = this.router.getCurrentNavigation()?.extras.state as {
      teamId: number;
      teamName: string;
    };
    console.log('Navigation state in ProjectsComponent:', state);
  
    if (state?.teamId) {
      this.teamId = state.teamId;
      this.teamName = state.teamName || '';
      console.log('Using state data for team:', state);

      if (!this.teamName) {
        this.fetchTeamDetails(this.teamId);
      }

      this.fetchProjects(this.teamId);
    } else {
      // Fallback to route params
      this.teamId = +this.route.snapshot.params['id']; // Ensure its a number
      if (this.teamId) {
        const companyId = this.userService.getSelectedCompany();
        if (companyId) {
          this.fetchProjects(this.teamId);
          this.fetchTeamDetails(this.teamId);
        } else {
          console.error('No company selected!');
        }
      } else {
        console.error('No team selected!');
      }
    }
    console.log('Team Name:', this.teamName);
    console.log('Team ID:', this.teamId);
  }
  
  
  
  
  fetchTeamDetails(teamId: number): void {
    this.http.get(`http://localhost:8080/team/${teamId}`).subscribe({
      next: (response: any) => {
        console.log('Fetched team details:', response);
        this.teamName = response.name;
        
      },
      error: (err) => {
        console.error('Error fetching team details:', err);
      },
    });
  }

  fetchProjects(teamId: number): void {
    const companyId = this.userService.getSelectedCompany(); //Fetch the selected company
    if (!companyId) {
      console.error('No company selected!');
      return;
    }
  
    this.userService.fetchProjects(companyId, teamId).subscribe({
      next: (response) => {
        console.log('Fetched projects:', response);
        this.projects = response;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      },
    });
  }
  
  openProjectPopup(project: any = null): void {
    this.selectedProject = project; // Null means create mode
    this.showNewProjectPopup = project === null;
    this.showEditProjectPopup = project !== null;
  }

  closeProjectPopup(): void {
    this.showNewProjectPopup = false;
    this.showEditProjectPopup = false;
    this.selectedProject = null;
  }
  goBack(): void {
    this.router.navigate(['/teams']);
  }
}
