// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8000/api/notifications'; // adapte l'URL à ton backend

  constructor(private http: HttpClient) {}

  /**
   * Récupère toutes les notifications (pour tous les utilisateurs)
   */
  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  /**
   * Récupère les notifications non lues de l'utilisateur connecté
   */
  getUnreadNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/unread`);
  }

  /**
   * Crée une nouvelle notification
   */
  createNotification(message: string, appointmentId?: number): Observable<Notification> {
    const payload: any = { message };
    if (appointmentId) {
      payload.appointment_id = appointmentId;
    }
    return this.http.post<Notification>(`${this.apiUrl}/create`, payload);
  }

  /**
   * Marque une notification comme lue
   */
  markAsRead(notificationId: number): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrl}/${notificationId}/read`, {});
  }

  /**
   * Supprime une notification
   */
  deleteNotification(notificationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${notificationId}`);
  }
}
