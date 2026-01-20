import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskPriority } from '../../models/task-priority.model';
import { TaskStatus } from '../../models/TaskStatus.model';
import { Appointment } from '../../models/appointment.model';
import { VicidialUser } from '../../models/vicidial-user.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() appointmentId?: number; // Change to optional
  @Input() newTaskUserId?: number;

  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  newTaskPriority: TaskPriority = 'MEDIUM';
  newTaskStatus: TaskStatus = 'PENDING';
  newTaskDueDate?: string; // pour le formulaire d'ajout
  editingTask?: Task;

  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.loadTasks();
  }

  /** Charger toutes les tâches liées à ce rendez-vous */
  loadTasks(): void {
    if (!this.appointmentId) {
      console.warn('Aucun appointmentId fourni');
      return;
    }
    this.taskService.getTasksByAppointment(this.appointmentId).subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Erreur chargement tasks:', err)
    });
  }

  /** Ajouter une nouvelle tâche */
  addTask(): void {
    if (!this.newTaskTitle.trim() || !this.appointmentId || !this.newTaskUserId) {
      console.warn('Données manquantes pour créer une tâche');
      console.log('appointmentId =', this.appointmentId, 'newTaskUserId =', this.newTaskUserId);
      return;
    }
    // ... création de la tâche
  
  
  
    const payload = {
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      priority: this.newTaskPriority,
      status: this.newTaskStatus,
      user: { id: this.newTaskUserId },
      appointment: { id: this.appointmentId },
      completed: false,
      dueDate: this.newTaskDueDate ? new Date(this.newTaskDueDate) : null
        };
  
    this.taskService.createTask(payload).subscribe({
      next: task => {
        this.tasks.unshift(task);
        this.clearForm();
      },
      error: err => console.error('Erreur création task:', err)
    });
  }
  
  /** Réinitialiser le formulaire */
  clearForm(): void {
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.newTaskPriority = 'MEDIUM';
    this.newTaskStatus = 'PENDING';
  }

  /** Activer l'édition */
// Dans ton component, lors de l'édition
startEditing(task: Task): void {
  this.editingTask = { ...task };

  // Si dueDate existe, on le formate pour l'input date
  if (this.editingTask.dueDate) {
    const date = new Date(this.editingTask.dueDate);
    this.editingTask.dueDate = date.toISOString().split('T')[0]; // "yyyy-MM-dd"
  }
}

/** Sauvegarder la modification */
saveEdit(): void {
  if (!this.editingTask || !this.editingTask.id) return;

  // Créer une copie du task pour le payload
  const payload = { ...this.editingTask };

  // dueDate doit rester une string "yyyy-MM-dd" pour <input type="date">
  // Aucune conversion en Date nécessaire côté Angular

  this.taskService.updateTask(this.editingTask.id, payload).subscribe({
    next: (updated) => {
      const index = this.tasks.findIndex((t) => t.id === updated.id);
      if (index > -1) this.tasks[index] = updated;
      this.editingTask = undefined;
    },
    error: (err) => console.error('Erreur mise à jour task:', err)
  });
}

  /** Annuler l'édition */
  cancelEdit(): void {
    this.editingTask = undefined;
  }

  /** Supprimer une tâche */
  deleteTask(task: Task): void {
    if (!task.id) return;

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
      error: (err) => console.error('Erreur suppression task:', err)
    });
  }

  /** Marquer une tâche comme complétée */
  completeTask(task: Task): void {
    if (!task.id) return;

    const updatedTask = { ...task, status: 'COMPLETED' as TaskStatus, completed: true };

    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: (t) => {
        const index = this.tasks.findIndex((x) => x.id === t.id);
        if (index > -1) this.tasks[index] = t;
      },
      error: (err) => console.error('Erreur compléter task:', err)
    });
  }
  getDaysUntilDue(task: Task): number | null {
    if (!task.dueDate) return null;
  
    const due = new Date(task.dueDate);
    const now = new Date();
    const diff = due.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }
  
  isOverdue(task: Task): boolean {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  }
  
}