import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {
  @Input() isEdit: boolean = false;
  @Input() form: any = { name: '', description: '', active: true };
  @Input() teamId: number | null = null;
  @Input() isAdmin: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() projectUpdated = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  submitForm(): void {
    if (this.isEdit) {
      this.http.patch(`http://localhost:8080/projects/${this.form.id}`, this.form).subscribe({
        next: (updatedProject) => {
          alert('Project updated successfully!');
          console.log('Updated project:', updatedProject);
          this.projectUpdated.emit(); // Notify parent to refresh
          this.close.emit();
        },
        error: (err) => {
          console.error('Error updating project:', err);
          alert('Failed to update project.');
        },
      });
    } else {
      this.http.post(`http://localhost:8080/projects/create/team/${this.teamId}`, this.form).subscribe({
        next: () => {
          alert('Project created successfully!');
          this.projectUpdated.emit(); // Notify parent to refresh
          this.close.emit();
        },
        error: (err) => {
          console.error('Error creating project:', err);
          alert('Failed to create project.');
        },
      });
    }
  }

  closePopup(): void {
    this.close.emit();
  }
}
