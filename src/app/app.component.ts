import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ThemeService } from './services/theme.service'; // ✅ importer le service

declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  title = 'frontVicidial';

  constructor(private themeService: ThemeService) {
    this.themeService.initTheme(); // ✅ initialiser thème au démarrage
  }

  ngAfterViewInit(): void {
    // Initialisation AdminLTE
    if ($) {
      $('[data-widget="pushmenu"]').PushMenu();
    }
  }
}
