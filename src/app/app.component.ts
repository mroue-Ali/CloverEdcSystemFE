import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showSidebar = true;
  title: string = 'CloverEdcFrontend';

  constructor(private router: Router) {
    // Hide the sidebar for specific routes
    this.router.events.subscribe(() => {
      this.showSidebar = !['/login', '/register'].includes(this.router.url);
    });
  }
}
