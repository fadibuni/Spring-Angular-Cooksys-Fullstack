import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponent } from './shared/shared.component';

import { WorkerComponent } from './worker/worker.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { TeamsComponent } from './teams/teams.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CompanyComponent } from './company/company.component';
import { UsersComponent } from './users/users.component';
import { TeamsContainerComponent } from './components/teams-container/teams-container.component';
import { TeamCardComponent } from './components/teams-container/team-card/team-card.component';
import { NameCellComponent } from './components/teams-container/team-card/name-cell/name-cell.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { AddTeamComponent } from './components/teams-container/add-team/add-team.component';
import { TeamFormComponent } from './components/teams-container/team-form/team-form.component';
@NgModule({
  declarations: [
    AppComponent,
    SharedComponent,
    WorkerComponent,
    AnnouncementsComponent,
    TeamsComponent,
    NavbarComponent,
    CompanyComponent,
    UsersComponent,
    TeamsContainerComponent,
    TeamCardComponent,
    NameCellComponent,
    ProjectsComponent,
    ProjectFormComponent,
    AddTeamComponent,
    TeamFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
