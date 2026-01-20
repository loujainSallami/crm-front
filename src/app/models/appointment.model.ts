// src/app/models/appointment.model.ts
import { Note } from './note.model';
import { Notification } from './notification.model';
import { Task } from './task.model';
import { VicidialUser } from './vicidial-user.model';
import { VicidialLead } from './VicidialLead.model';

export interface Appointment {
  id?: number;
  startTime: Date;
  endTime: Date;
  description: string;
  user: VicidialUser;
  lead?: VicidialLead;
  notes?: Note[];
  notifications?: Notification[];
  tasks?: Task[];
}
