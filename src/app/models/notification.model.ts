// src/app/models/notification.model.ts
import { VicidialUser } from './vicidial-user.model';
import { Appointment } from './appointment.model';

export interface Notification {
  id?: number;
  isRead: boolean;
  message: string;
  createdAt: string;
  user: VicidialUser;
  appointment?: Appointment | null; // optionnel si certaines notifications n'ont pas de rendez-vous
  }
