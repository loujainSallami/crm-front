import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Configuration pour l'application avec les interceptors et les routes
const appConfig = {
  providers: [
    provideAnimations(), // ✅ Active les animations pour Angular Material

    provideRouter(routes),  // Fournit les routes
    provideHttpClient(
      withInterceptors([AuthInterceptor])  // Ajoute l'interceptor pour les requêtes HTTP
    ), provideAnimationsAsync(),
  ]
};

// Démarre l'application avec la configuration spécifiée
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
