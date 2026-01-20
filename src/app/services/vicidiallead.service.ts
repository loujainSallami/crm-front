import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VicidialleadService {
  private apiUrl = 'http://localhost:8000/api/vicidial-leads/getAllLeads';

  constructor(private http: HttpClient) {}

  getLeads(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
