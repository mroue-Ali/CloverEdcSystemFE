import {Component} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {sideBarItems} from '../sideBarItems';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  items: any[] = [];
  isCollapsed = true;
  user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private router: Router, private authService: AuthService) {
    const role = this.authService.getRole();

    // this.items = sideBarItems.filter((item) => item.roles.includes(role));
    // this.items = sideBarItems.filter((item) => item.roles.includes('All'));
    this.items = sideBarItems.filter((item) => item.roles.includes(role) || item.roles.includes('All'));
    // Add Logout item dynamically
    this.items.push({
      title: 'Logout',
      icon: 'logout',
      route: '/logout',
      roles: ['All'],
      action: () => this.logout() // Assign logout action
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  handleItemClick(item: any) {
    if (item.action) {
      item.action(); // Call custom action if it exists
    } else {
      this.router.navigate([item.route]); // Navigate if it's a regular route
    }
  }

  logout() {
    this.authService.logout();
  }
}
