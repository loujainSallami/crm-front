// src/app/models/note.model.ts
import { VicidialUser } from './vicidial-user.model';
import { Appointment } from './appointment.model';

export interface Note {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isImportant?: boolean;
  vicidialUserId?: number;
  appointmentId: number;
  user?: any;         // optionnel
  appointment?: any;  // optionnel
}
