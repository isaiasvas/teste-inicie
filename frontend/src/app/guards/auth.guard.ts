import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Verifica se o usuario esta  logado.
   * 
   * Navega para a pagina de login se o usuario não estiver logado.
   * 
   * @returns boolean - Verdadeiro se o usuario estiver logado, falso caso contrario.
   */
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
