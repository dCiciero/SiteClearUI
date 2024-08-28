
import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const userRole = authService.getUserRole();
  const allowedRoles = route.data['allowedRoles'] as string[];

  if (authService.hasPermission(allowedRoles)) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url }})
    return false;
  }


  if (authService.isAuth.value == false) {
    router.navigate(['/login'])
    return false;
  }
  return authService.isAuth.value;
};


/*
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const isLoggedIn = this.authService.isLoggedIn();
    const userRole = this.authService.getUserRole();
    const requiredRole = route.data['role'];

    if (isLoggedIn && (!requiredRole || requiredRole === userRole)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
*/

