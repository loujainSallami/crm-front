import { TaskPriority } from "./task-priority.model";
import { TaskStatus } from "./TaskStatus.model";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  completed: boolean;
  createdAt?: string;   // reçu du backend (ISO 8601)
  completedAt?: string; // reçu du backend
  dueDate?: string;     // reçu du backend
  userId?: number;
  appointmentId?: number;
  overdue?: boolean;     // envoyé par backend
  daysLeft?: number;  
}
