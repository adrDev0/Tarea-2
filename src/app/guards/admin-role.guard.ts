import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { IRoleType } from "../interfaces";

@Injectable({
  providedIn: 'root',
})
export class AdminRoleGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let currentRole: string = "";
    let user = localStorage.getItem('auth_user');
    if(user) {
      currentRole = String(JSON.parse(user)?.role.name);
    }

    if (currentRole !== "SUPER_ADMIN_ROLE") {
      this.router.navigate(['access-denied']);
      return false;
    }
    return true;
  }
}