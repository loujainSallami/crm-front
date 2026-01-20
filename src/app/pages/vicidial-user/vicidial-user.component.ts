import { Component } from '@angular/core';
import { VicidialUserService } from '../../services/vicidil-user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vicidial-user',
  templateUrl: './vicidial-user.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule], 
})
export class VicidialUserComponent {
  users: any[] = [];
  newUser = { user: '', pass: '' }; // Données du formulaire
  message = 'utilisateur créer avec succés'; // Message à afficher après la soumission
  success = false; // Flag pour afficher le succès ou l'erreur

  constructor(private vicidialUserService: VicidialUserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Méthode pour créer un utilisateur
  createUser() {
    this.vicidialUserService.createUser(this.newUser).subscribe({
      next: (res) => {
        this.message = 'Utilisateur créé avec succès!';
        this.success = true;
        this.newUser = { user: '', pass: '' }; // Réinitialiser le formulaire
        this.loadUsers(); // Charger la liste des utilisateurs
      },
      error: (err) => {
        this.message = err.error.message || 'Erreur lors de la création de l\'utilisateur';
        this.success = false;
      }
    });
  }

  // Charger tous les utilisateurs après la création
  loadUsers() {
    this.vicidialUserService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }
}
