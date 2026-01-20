// src/app/components/notifications/notifications.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';

@Component({
  standalone: true,
  selector: 'app-notifications',
  imports: [
    CommonModule,   // ✅ ngIf, ngFor
    RouterModule    // ✅ routerLink
  ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  loading = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadNotifications(): void {
    this.loading = true;
    this.notificationService.getAllNotifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.notifications = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement des notifications';
          console.error(err);
          this.loading = false;
        }
      });
  }

  markAsRead(notification: Notification): void {
    if (!notification.id) return;

    this.notificationService.markAsRead(notification.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          notification.isRead = true;
        },
        error: (err) =>
          console.error('Erreur lors de la lecture de la notification', err)
      });
  }

  deleteNotification(notification: Notification): void {
    if (!notification.id) return;

    this.notificationService.deleteNotification(notification.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notifications = this.notifications.filter(
            n => n.id !== notification.id
          );
        },
        error: (err) =>
          console.error('Erreur lors de la suppression de la notification', err)
      });
  }
}
