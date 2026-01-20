import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentDeleteConfirmComponent } from '../appointment-delete-confirm/appointment-delete-confirm.component';
import { AppointmentUpdateComponent } from '../appointment-update/appointment-update.component';
import { NoteComponent } from '../note/note.component';
import { TaskComponent } from '../task/task.component';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-appointmentdetails',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    NoteComponent,
    MatCardModule,
    TaskComponent
  ],
  templateUrl: './appointmentdetails.component.html',
  styleUrls: ['./appointmentdetails.component.css']
})
export class AppointmentdetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Appointment,
    private dialogRef: MatDialogRef<AppointmentdetailsComponent>,
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log("📌 Appointment data =", this.data);
  }

  onDelete() {
    const dialogRef = this.dialog.open(AppointmentDeleteConfirmComponent, {
      data: { taskCount: this.data?.tasks?.length || 0 }
    });

    dialogRef.afterClosed().subscribe((deleteTasks: boolean) => {
      if (deleteTasks && this.data?.id) {
        this.appointmentService.delete(this.data.id, deleteTasks).subscribe({
          next: (res) => {
            this.snackBar.open(res.message, 'OK', { duration: 3500 });
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.snackBar.open(err.error?.error || 'Erreur lors de la suppression', 'Fermer', { duration: 4000 });
          }
        });
      }
    });
  }

  onClose() { this.dialogRef.close(); }

  onUpdate() {
    if (!this.data?.id) return;
    const dialogRef = this.dialog.open(AppointmentUpdateComponent, {
      width: '500px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'updated') this.dialogRef.close('updated');
    });
  }
}
