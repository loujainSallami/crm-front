import { Injectable } from '@angular/core';

export type ThemeType = 'light' | 'dark' | 'auto';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private storageKey = 'crm-theme';

  constructor() {
    this.initTheme();
  }

  initTheme(): void {
    const stored = localStorage.getItem(this.storageKey) as ThemeType | null;
    const theme: ThemeType = stored === 'light' || stored === 'dark' || stored === 'auto' ? stored : 'auto';
    this.applyTheme(theme);
  }

  applyTheme(theme: ThemeType): void {
    const body = document.body;

    // Retirer la classe dark-mode
    body.classList.remove('dark-mode');

    if (theme === 'dark') {
      body.classList.add('dark-mode');
    } else if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) body.classList.add('dark-mode');
    }

    localStorage.setItem(this.storageKey, theme);
  }

  getTheme(): ThemeType {
    const stored = localStorage.getItem(this.storageKey) as ThemeType | null;
    return stored === 'light' || stored === 'dark' || stored === 'auto' ? stored : 'auto';
  }
}
