import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-delete-confirm',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirmation de suppression</h2>
    <mat-dialog-content>
      <p>Ce rendez-vous a {{ data.taskCount }} tâche(s) associée(s).</p>
      <p>Voulez-vous vraiment supprimer ce rendez-vous ?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-flat-button color="warn" (click)="onConfirm()">Supprimer</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content { font-size: 14px; }
    mat-dialog-actions { margin-top: 20px; }
  `]
})
export class AppointmentDeleteConfirmComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { taskCount: number },
    private dialogRef: MatDialogRef<AppointmentDeleteConfirmComponent>
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
