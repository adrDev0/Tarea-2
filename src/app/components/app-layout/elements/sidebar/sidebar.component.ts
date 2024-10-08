import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../../../../services/layout.service';
import { AuthService } from '../../../../services/auth.service';
import { SvgIconComponent } from '../../../svg-icon/svg-icon.component';
import { routes } from '../../../../app.routes';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    SvgIconComponent
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public width: any = window.innerWidth;
  public showLeftArrow: boolean = true;
  public showRigthArrow: boolean = false;
  public permittedRoutes: Route[] = [];
  appRoutes: any;


  user = localStorage.getItem('auth_user');
  userRole: string = ""; 
  userId: string = "";

  constructor(
    public router: Router,
    public layoutService: LayoutService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if(this.user) {
      this.userRole = String(JSON.parse(this.user).role.name);
      this.userId = String(JSON.parse(this.user).id);
    }
  }
}
