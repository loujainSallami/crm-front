import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model'; // ✅ Assure-toi que ce modèle existe

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:8000/api/notes';

  constructor(private http: HttpClient) {}

  /** 🔹 Créer une note pour un rendez-vous */
  createNote(content: string, appointmentId: number): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, { content, appointment_id: appointmentId });
  }

  /** 🔹 Récupérer toutes les notes d’un rendez-vous */
  getNotesByAppointment(appointmentId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/appointment/${appointmentId}`);
  }

  
  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** 🔹 Modifier une note */
updateNote(id: number, content: string): Observable<Note> {
  return this.http.put<Note>(`${this.apiUrl}/${id}`, { content });
}

}
