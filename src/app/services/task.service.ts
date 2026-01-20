import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8000/api/tasks';

  constructor(private http: HttpClient) {}

  /** Convertit les champs date en objets Date */
  private transformTask(task: any): Task {
    return {
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
      completedAt: task.completedAt ? new Date(task.completedAt) : null
    };
  }

  /** Créer une tâche */
  createTask(task: any): Observable<Task> {
    if (!task.appointment?.id && !task.appointmentId) {
      throw new Error('Appointment ID is required');
    }
    if (!task.user?.id && !task.userId) {
      throw new Error('User ID is required');
    }

    return this.http.post<Task>(this.apiUrl, {
      title: task.title,
      description: task.description ?? null,
      appointmentId: task.appointment?.id ?? task.appointmentId,
      userId: task.user?.id ?? task.userId,
      status: (task.status ?? 'PENDING').toUpperCase(),
      priority: (task.priority ?? 'MEDIUM').toUpperCase(),
      dueDate: task.dueDate ? task.dueDate.toISOString() : null
    }).pipe(
      map(this.transformTask)
    );
  }

  /** Récupérer toutes les tâches */
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map(tasks => tasks.map(this.transformTask))
    );
  }

  /** Récupérer les tâches d’un rendez-vous */
  getTasksByAppointment(appointmentId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/appointment/${appointmentId}`).pipe(
      map(tasks => tasks.map(this.transformTask))
    );
  }

  /** Mettre à jour une tâche */
  updateTask(id: number, task: any): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, {
      title: task.title,
      description: task.description ?? null,
      status: task.status?.toUpperCase() ?? 'PENDING',
      priority: task.priority?.toUpperCase() ?? 'MEDIUM',
      dueDate: task.dueDate ?? null,
      completed: task.completed ?? false
    }).pipe(
      map(this.transformTask)
    );
  }

  /** Supprimer une tâche */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
