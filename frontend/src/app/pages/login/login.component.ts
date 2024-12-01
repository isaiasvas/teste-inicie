import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,  // Define como no-standalone
  
})
export class LoginComponent {
  loginForm: FormGroup;
  
  /**
   * Construtor da classe LoginComponent.
   *
   * @param fb Instancia do FormBuilder para criar o formulario.
   * @param authService Instancia do AuthService para fazer o login.
   * @param router Instancia do Router para redirecionar após o login.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Envia uma solicita o de login para o servidor.
   *
   * Verifica se o formulario é valido e, se sim, faz uma solicita o POST para o endpoint /login com as credenciais informadas.
   * Se a solicita o for bem-sucedida, salva o token de autentica o no armazenamento local e redireciona para a p gina de tarefas.
   * Se houver um erro, exibe uma mensagem de erro informando que as credenciais é inválidas.
   */
  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/tasks']);
        },
        (error) => {
          alert('Credenciais inválidas!');
        }
      );
    }
  }
}
