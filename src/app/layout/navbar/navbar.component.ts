import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeService, ThemeType } from '../../services/theme.service';
import { NotificationsComponent } from '../../components/notification/notifications.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NotificationsComponent], // ✅ OK
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private themeService: ThemeService) {}

  setTheme(theme: ThemeType) {
    this.themeService.applyTheme(theme);
  }
}
