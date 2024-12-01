import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/apiresponse.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  
  /**
  * URL base da API.
  *
  * @type string
  */
  private url = environment.api+'/tasks';
  
  constructor(private httpClient: HttpClient, private router: Router) {}
  
  
  /**
  * Recupera o token de autentica o do armazenamento local.
  *
  * @returns string | null - O token de autenticão do usuario se presente, caso contrário, null.
  */
  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }
  
  
  /**
  * Cria os headers com o token de autenticação se estiver presente no armazenamento.
  *
  * @returns HttpHeaders - Os headers com o token de autenticação.
  */
  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders();
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }
  
  /**
   * Recupera a lista de tarefas do servidor.
   *
   * Faz uma solicita o GET para o endpoint /tasks e retorna um Observable com o resultado.
   *
   * @returns Observable<ApiResponse> - Observable com a lista de tarefas.
   */
  getTasks(): Observable<ApiResponse> {
    const headers = this.getHeaders();
    console.log('URL da API:', this.url);
    console.log('Headers:', headers);
  
    return this.httpClient.get<ApiResponse>(this.url, { headers }).pipe(
      catchError((error) => {
        console.error('Erro ao buscar tarefas:', error);
        return throwError(error);
      })
    );
  }
  
  
  /**
 * Cria uma nova tarefa no servidor.
 *
 * @param title Título da tarefa.
 * @returns Observable<Task> - Observable com a tarefa criada.
 */
createTask(title: string): Observable<Task> {
  const headers = this.getHeaders();
  const newTask = { title, status: 'pendente' }; // Nova tarefa começa como "pendente"
  return this.httpClient.post<Task>(this.url, newTask, { headers }).pipe(
    catchError((error) => {
      console.error('Erro ao criar tarefa:', error);
      return throwError(error);
    })
  );
}
  
 /**
 * Atualiza o status de uma tarefa no servidor.
 *
 * @param id Identificador da tarefa.
 * @param status Novo status da tarefa: "pendente" ou "concluída".
 * @returns Observable<Task> - Observable com a tarefa atualizada.
 */
updateTaskStatus(id: number, status: 'pendente' | 'concluída'): Observable<Task> {
  const headers = this.getHeaders();
  return this.httpClient.put<Task>(`${this.url}/${id}/status`, { status }, { headers }).pipe(
    catchError((error) => {
      console.error('Erro ao atualizar status da tarefa:', error);
      return throwError(error);
    })
  );
}

  
/**
 * Exclui uma tarefa do servidor.
 *
 * @param id Identificador da tarefa.
 * @returns Observable<any> - Observable com a confirmação da exclusão.
 */
deleteTask(id: number): Observable<any> {
  const headers = this.getHeaders();
  return this.httpClient.delete(`${this.url}/${id}`, { headers }).pipe(
    catchError((error) => {
      console.error('Erro ao excluir tarefa:', error);
      return throwError(error);
    })
  );
}

  
  /**
  * Lida com erros de autenticação.
  *
  * Verifica se o erro é relacionado à falta de token ou token inválido.
  * Se for, faz o logout e redireciona para a página de login.
  *
  * @param error Erro da requisição HTTP.
  * @returns Observable<any> - Observable com erro.
  */
  private handleAuthError(error: any): Observable<any> {
    if (error.status === 401 || error.error?.message === 'Usuário não autenticado. Forneça um token válido.') {
      // Remover token do localStorage
      localStorage.removeItem('token');
      
      // Redirecionar para a tela de login
      this.router.navigate(['/login']);
    }
    
    return throwError(error); // Repassa o erro para o componente
  }
}
