import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importation de CommonModule et FormsModule pour gérer les formulaires
})
export class LoginComponent {
  user = '';  // Nom d'utilisateur
  pass = '';  // Mot de passe
  error = '';  // Message d'erreur
  successMessage = '';  // Message de réussite

  constructor(private auth: AuthService, private router: Router) {}

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    this.auth.login({ user: this.user, pass: this.pass }).subscribe({
      next: (res) => {
        // Sauvegarder le token JWT dans le localStorage ou service
        this.auth.saveToken(res.token);

        // Mettre à jour le message de succès
        this.successMessage = 'Connexion réussie ! Vous êtes redirigé vers votre tableau de bord.';

        // Rediriger l'utilisateur vers une page protégée, par exemple /home
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);  // Attendre 2 secondes pour que l'utilisateur puisse lire le message
      },
      error: (err) => {
        // Afficher un message d'erreur en cas d'échec de la connexion
        this.error = 'Échec de connexion : identifiants incorrects';
      }
    });
  }
}
