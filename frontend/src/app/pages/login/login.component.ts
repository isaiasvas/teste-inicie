import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Verifica se o usuário já está logado e, se sim,
   * redireciona para a página de tarefas.
   * 
   * @returns void
   */
  ngOnInit(): void {
    // Se já estiver logado, redireciona para a página de tarefas
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tasks']);
    }
  }

  /**
   * Abre uma notificação com uma mensagem e uma ação.
   * 
   * @param {string} message A mensagem da notificação.
   * @param {string} action A ação da notificação.
   * @param {number} duration A duração da notificação em milissegundos.
   * 
   * @returns void
   */
  openSnackBar(message: string, action: string, duration: number = 3000): void {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  /**
   * Faz o login do usuário com as credenciais informadas.
   * 
   * Verifica se o formulário de login é válido e, se sim, chama o serviço de autenticação.
   * 
   * Se o login for bem-sucedido, redireciona para a página de tarefas.
   * 
   * Se o login falhar, exibe uma mensagem de erro.
   * 
   * @returns void
   */
  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          this.router.navigate(['/tasks']); // Redireciona para as tarefas após o login
        },
        (error) => {
          this.openSnackBar('Erro ao fazer login. Verifique suas credenciais.', 'Fechar', 5000);
        }
      );
    }
  }
}
