import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userKey = 'user';
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  setUserSession(user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    token?: string;
  }): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUserSession(): {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    token?: string;
  } | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getUserSession();
  }

  // Check if the user is an admin
  isAdmin(): boolean {
    const user = this.getUserSession();
    return user?.role === 'admin';
  }

  fetchTeams(): Observable<any[]> {
    console.log('fetching teams');
    console.log(
      this.baseUrl + '/company/' + this.getSelectedCompany() + '/teams'
    );
    return this.http.get<any[]>(
      this.baseUrl + '/company/' + this.getSelectedCompany() + '/teams'
    );
  }

  fetchProjects(companyId: number, teamId: number): Observable<any[]> {
    const url = `${this.baseUrl}/company/${companyId}/teams/${teamId}/projects`;
    console.log(`Fetching projects from URL: ${url}`);
    return this.http.get<any[]>(url);
  }
  fetchUsers(): Observable<any[]> {
    console.log('fetching users');
    console.log(this.baseUrl + "/company/" + this.getSelectedCompany() + "/users");
    return this.http.get<any[]>(
      this.baseUrl + `/company/${this.getSelectedCompany()}/users`
    );
  }
  fetchCompanies(): Observable<any[]> {
    const user = this.getUserSession();

    // If the user is an admin, fetch all companies
    if (user?.role === 'admin') {
      console.log('fetching companies');
      return this.http.get<any[]>(this.baseUrl + '/company/');
    }

    // If the user is a worker, fetch only the associated company
    if (user) {
      return this.http.get<any[]>(`${this.baseUrl}/users/${user.id}/company`);
    }

    // Return empty array if no user is logged in
    return of([]);
  }
  setSelectedCompany(companyId: number): void {
    localStorage.setItem('selectedCompany', companyId.toString());
  }

  getSelectedCompany(): number | null {
    const companyId = localStorage.getItem('selectedCompany');
    return companyId ? parseInt(companyId, 10) : null;
  }

  // Clear user session data from localStorage
  clearSession(): void {
    localStorage.removeItem(this.userKey);
  }
}
