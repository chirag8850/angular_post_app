import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
class PermissionsService {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userHasPermission = this.checkUserPermissions();

    if (!userHasPermission) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  private checkUserPermissions(): boolean {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return !!(username && password);
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
