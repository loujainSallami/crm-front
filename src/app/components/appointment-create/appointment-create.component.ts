import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatSelectModule } from '@angular/material/select';
import { VicidialleadService } from '../../services/vicidiallead.service';
import { VicidialUserService } from '../../services/vicidil-user-service.service';

@Component({
  selector: 'app-appointment-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  template: `
 <div class="form-container">
  <h2>Créer un rendez-vous</h2>
  <form [formGroup]="form" (ngSubmit)="onSubmit()">

    <mat-form-field appearance="fill" class="full-width">
      <mat-label>Description</mat-label>
      <input matInput formControlName="description" required>
    </mat-form-field>

    <mat-form-field appearance="fill" class="full-width">
      <mat-label>Start Time</mat-label>
      <input matInput type="datetime-local" formControlName="startTime" required>
    </mat-form-field>

    <mat-form-field appearance="fill" class="full-width">
      <mat-label>End Time</mat-label>
      <input matInput type="datetime-local" formControlName="endTime" required>
    </mat-form-field>

    <mat-form-field appearance="fill" class="full-width">
      <mat-label>Sélectionner un Lead</mat-label>
      <mat-select formControlName="leadId" required>
        <mat-option *ngFor="let lead of leads" [value]="lead.id">
          {{ lead.firstName }}
        </mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field appearance="fill" class="full-width">
      <mat-label>Sélectionner un Agent</mat-label>
      <mat-select formControlName="user" required>
        <mat-option *ngFor="let user of users" [value]="user.id">
          {{ user.full_name ? user.full_name : user.user }}
        </mat-option>
      </mat-select>
    </mat-form-field>

    <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid" class="submit-btn">
      Créer
    </button>
  </form>
</div>
  `,
  styles: [`
    .form-container {
      max-width: 480px;
      margin: 40px auto;
      padding: 30px 25px;
      background: #fff;
      box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
      border-radius: 8px;
      font-family: 'Roboto', sans-serif;
    }
    h2 {
      text-align: center;
      margin-bottom: 25px;
      color: #3f51b5;
      font-weight: 500;
    }
    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }
      
    .submit-btn {
      width: 100%;
      padding: 12px 0;
      font-size: 16px;
      font-weight: 600;
      border-radius: 6px;
    }
  `]
})
export class AppointmentCreateComponent implements OnInit {
  form: FormGroup;
  leads: any[] = [];
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppointmentCreateComponent>,
    private appointmentService: AppointmentService,
    private leadService: VicidialleadService,
    private userService: VicidialUserService
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      leadId: [null, Validators.required],
      user: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadLeads();
    this.loadUsers();
  }

  loadLeads() {
    this.leadService.getLeads().subscribe({
      next: (leads: any[]) => {
        console.log('Leads reçus:', leads);
        this.leads = leads;
      },
      error: (err) => console.error('Erreur chargement leads:', err)
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users: any[]) => {
        console.log('Users reçus:', users);
        this.users = users;
      },
      error: (err) => console.error('Erreur chargement users:', err)
    });
  }

  onSubmit() {
    if (!this.form.valid) return;
  
    const payload = {
      description: this.form.value.description,
      startTime: this.form.value.startTime,
      endTime: this.form.value.endTime,
      leadId: this.form.value.leadId,
      userId: this.form.value.user   // 👈 ici, on renomme correctement
    };
  
    console.log("📤 Payload final envoyé :", payload);
  
    this.appointmentService.create(payload).subscribe({
      next: (appointment) => this.dialogRef.close(appointment),
      error: (err) => {
        console.error("❌ Erreur lors de la création :", err);
        alert('Erreur lors de la création: ' + err.message);
      }
    });
  }
  
}
