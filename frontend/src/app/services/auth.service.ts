import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = environment.api;
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  
  constructor(private http: HttpClient, private router: Router) {}
  
  /**
  * Envia uma solicita o de login para o servidor.
  *
  * Faz uma solicita o POST para o endpoint /login com as credenciais informadas.
  *
  * @param credentials Um objeto contendo o email e senha do usu rio.
  * @returns Observable<any> - Um observable com a resposta do servidor.
  */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.loggedIn.next(true); // Atualiza o estado de autenticação para 'logado'
      })
    );
  }
  
  /**
   * Realiza o logout do usuário removendo o token de autenticação do armazenamento local
   * e navegando para a página de login.
   * 
   * @returns void
   */
  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false); // Atualiza o estado de autenticação para 'deslogado'
    this.router.navigate(['/login']);
  }

  /**
   * Verifica se o usuário está logado.
   * @returns boolean - Verdadeiro se o usuário está logado, falso caso contrário.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Retorna um observable que emite o estado de autenticação do usuário.
   * @returns Observable<boolean>
   */
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  /**
   * Retorna o token de autenticação do usuário armazenado no armazenamento local.
   * @returns string | null - O token de autenticação do usuário se ele estiver logado, null caso contrário.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
