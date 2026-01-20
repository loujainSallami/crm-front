// src/app/services/appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Appointment } from '../models/appointment.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient , private authService: AuthService) {}
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });
  }
  // Créer un rendez-vous
  create(appointment: Partial<Appointment>): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}`, appointment);
  }

  // Mettre à jour
  update(id: number, appointment: Partial<Appointment>): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment);
  }

  // Supprimer
  /*delete(id: number, deleteTasks: boolean = false): Observable<void> {
    const params = new HttpParams().set('deleteTasks', deleteTasks.toString());
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
      params
    });
  }
  */
  delete(id: number, deleteTasks: boolean): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/${id}?deleteTasks=${deleteTasks}`, 
      { observe: 'body' }
    );
  }
  
  

  // Récupérer les rendez-vous d’un utilisateur
  getByUser(userId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/userapp/${userId}`);
  }

  // Récupérer un rendez-vous par ID
getById(id: number): Observable<Appointment> {
  return this.http.get<Appointment>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
}

  // Récupérer tous les rendez-vous pour l'admin
  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }
}
