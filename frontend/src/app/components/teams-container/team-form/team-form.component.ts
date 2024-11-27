import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/services/user.service';
@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css'],
})
export class TeamFormComponent {
  @Output() close = new EventEmitter<void>(); // Emits when the form is closed
  @Output() teamUpdated = new EventEmitter<void>(); // Emits when a team is updated

  teamName: string = '';
  description: string = '';
  selectedMembers: any[] = [];
  members: any[] = [];
  companyId: number | null = null;
  selectedMember?: string;
  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit() {
    this.userService.fetchUsers().subscribe({
      next: (members) => {
        console.log(members);
        this.members = members;
      },
      error: (err) => {
        console.error('Error fetching members:', err);
      },
    });

    this.companyId = this.userService.getSelectedCompany();
  }

  addMember(event: Event) {
    // Ensure event.target is treated as an HTMLSelectElement
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    console.log(event);
    console.log('Selected member as JSON:', selectedValue);

    // Find the member in the members list
    const member = this.members.find(
      (m) => `${m.profile.firstName} ${m.profile.lastName.charAt(0)}.` === selectedValue
    );
console.log(member);
    // Add the member if they aren't already in the selectedMembers array
    if (member && !this.selectedMembers.includes(member)) {
      this.selectedMembers.push(member);
      this.members = this.members.filter((m) => m !== member);
    }
    selectElement.value = "";
  }

  removeMember(member: any) {
    this.selectedMembers = this.selectedMembers.filter((m) => m !== member);
    this.members.push(member);
  }

  closeForm() {
    this.close.emit(); // Notify the parent to close the popup
  }

  submitTeam() {
    if (!this.teamName || !this.description || !this.selectedMembers.length) {
      alert('Please fill out all fields and select at least one member.');
      return;
    }

    const payload = {
      name: this.teamName,
      description: this.description,
      teammates: this.selectedMembers.map((member) => (
        member.id
      )),
    };

    console.log('Submitting team:', payload);
    this.http
      .post(
        `http://localhost:8080/team/create/company/${this.companyId}`,
        payload
      )
      .subscribe({
        next: () => {
          alert('Team created successfully!');
          this.teamUpdated.emit(); // Notify the parent to refresh the team list
          this.closeForm(); // Close the form after submission
        },
        error: (err) => {
          console.error('Error creating team:', err);
          alert('Error creating team. Please try again.');
        },
      });
  }
}
