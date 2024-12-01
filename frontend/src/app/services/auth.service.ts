import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
private apiUrl = environment.api;

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
        return this.http.post(`${this.apiUrl}/login`, credentials);
        }

        /**
        * Realiza o logout do usu rio removendo o token de autentica o do armazenamento local
        * e navegando para a p gina de login.
        */
        logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        }

        /**
        * Verifica se o usu rio est logado.
        *
        * A verifica o realizada verificando se o token de autentica o existe no
        * armazenamento local.
        *
        * @returns boolean - Verdadeiro se o usu rio est logado, falso caso contr rio.
        */
        isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
        }

        /**
        * Retorna o token de autentica o do usu rio armazenado no armazenamento local.
        *
        * @returns string | null - O token de autentica o do usu rio se ele estiver logado, null caso contr rio.
        */
        getToken(): string | null {
        return localStorage.getItem('token');
        }
        }
