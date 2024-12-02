import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false; // Variável para controlar o estado de autenticação
  private authStateSubscription!: Subscription; // Declara a variável Subscription corretamente

  constructor(private router: Router, private authService: AuthService,) {}

  ngOnInit(): void {
    // Inscreve-se no Observable de estado de autenticação
    this.authStateSubscription = this.authService.isLoggedIn$.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated; // Atualiza o estado de autenticação
      }
    );
  }

  /**
   * Método de logout que chama o AuthService.
   */
  logout(): void {
    this.authService.logout(); // Chama o logout do AuthService
  }

  ngOnDestroy(): void {
    // Desinscreve-se do Observable para evitar vazamento de memória
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }
}
