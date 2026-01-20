import { inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

// Correction de la signature du type HttpInterceptorFn
export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);  // Utiliser inject pour obtenir le service

  const token = authService.getToken();  // Récupérer le token d'authentification
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,  // Ajouter l'en-tête Authorization avec le token
      }
    });
  }

  return next(req);  // Appel à la fonction `next` avec la requête modifiée
};
