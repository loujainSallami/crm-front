import { Route } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { VicidialUserComponent } from "./pages/vicidial-user/vicidial-user.component";
import { AgendaComponent } from "./components/Agenda/agenda-component";
import { authGuard } from "./guards/auth.guard";
import { NotificationsComponent } from "./components/notification/notifications.component";

export const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: VicidialUserComponent },
  { path: 'agenda', component: AgendaComponent, canActivate: [authGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [authGuard] },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
