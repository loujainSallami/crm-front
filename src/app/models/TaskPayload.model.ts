import { TaskPriority } from './task-priority.model';
import { TaskStatus } from './TaskStatus.model';

export interface TaskPayload {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    completed: boolean;
    appointmentId: number;
    userId: number;
  }
  