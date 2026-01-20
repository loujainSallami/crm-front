import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { AppointmentService } from '../../services/appointment.service';
import { VicidialUserService } from '../../services/vicidil-user-service.service';
import { VicidialleadService } from '../../services/vicidiallead.service';

// ✅ Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-update',
  standalone: true,  // ✅ standalone activé
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './appointment-update.component.html',
  styleUrls: ['./appointment-update.component.scss']
})
export class AppointmentUpdateComponent implements OnInit {
  form!: FormGroup;
  leads: any[] = [];
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private userService: VicidialUserService,
    private leadService: VicidialleadService,
    private dialogRef: MatDialogRef<AppointmentUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log("💡 DATA reçue pour modification :", this.data);

    this.form = this.fb.group({
      description: [this.data.description, Validators.required],
      startTime: [this.data.startTime, Validators.required],
      endTime: [this.data.endTime, Validators.required],
      leadId: [this.data.lead ? this.data.lead.id : null, Validators.required],
      userId: [this.data.user ? this.data.user.id : null, Validators.required]
    });

    this.loadLeads();
    this.loadUsers();
  }

  loadLeads(): void {
    this.leadService.getLeads().subscribe({
      next: (leads) => this.leads = leads,
      error: (err) => console.error("❌ Erreur chargement leads :", err)
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        if (this.data.user) {
          const exists = this.users.find(u => u.id === this.data.user.id);
          if (!exists) this.users.push(this.data.user);
        }
      },
      error: (err) => console.error("❌ Erreur chargement users :", err)
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedAppointment = {
        description: this.form.value.description,
        startTime: this.form.value.startTime,
        endTime: this.form.value.endTime,
        leadId: this.form.value.leadId,
        userId: this.form.value.userId
      };
  
      console.log("📤 Payload final envoyé :", updatedAppointment); // ← ici
  
      this.appointmentService.update(this.data.id, updatedAppointment).subscribe({
        next: () => {
          console.log("✅ Appointment mis à jour !");
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error("❌ Erreur update :", err);
        }
      });
    } else {
      console.warn("⚠️ Formulaire invalide :", this.form.value);
    }
  }
  
  
}
