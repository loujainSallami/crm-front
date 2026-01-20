import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() appointmentId!: number;

  notes: Note[] = [];
  newNoteContent: string = '';
  editingNote?: Note; // ✅ pour savoir quelle note on modifie

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  /** Charger les notes */
  loadNotes(): void {
    if (!this.appointmentId) return;
    this.noteService.getNotesByAppointment(this.appointmentId).subscribe({
      next: (data) => (this.notes = data),
      error: (err) => console.error('Erreur chargement notes:', err)
    });
  }

  /** Ajouter une note */
  addNote(): void {
    if (!this.newNoteContent.trim() || !this.appointmentId) return;

    this.noteService.createNote(this.newNoteContent, this.appointmentId).subscribe({
      next: (note) => {
        this.notes.push(note);
        this.newNoteContent = '';
      },
      error: (err) => console.error('Erreur création note:', err)
    });
  }

  /** Supprimer une note */
  deleteNote(note: Note): void {
    if (!note.id) {
      console.error('ID de la note manquant', note);
      return;
    }
  
    if (!confirm('Supprimer cette note ?')) return;
  
    this.noteService.deleteNote(note.id).subscribe({
      next: () => {
        this.notes = this.notes.filter((n) => n.id !== note.id);
      },
      error: (err) => console.error('Erreur suppression note:', err)
    });
  }
  

  /** Activer l’édition d’une note */
  startEditing(note: Note): void {
    this.editingNote = { ...note };
  }

  /** Sauvegarder la modification */
  saveEdit(): void {
    if (!this.editingNote) return;

    this.noteService.updateNote(this.editingNote.id!, this.editingNote.content).subscribe({
      next: (updatedNote) => {
        const index = this.notes.findIndex((n) => n.id === updatedNote.id);
        if (index > -1) this.notes[index] = updatedNote;
        this.editingNote = undefined;
      },
      error: (err) => console.error('Erreur mise à jour note:', err)
    });
  }

  /** Annuler la modification */
  cancelEdit(): void {
    this.editingNote = undefined;
  }
}
