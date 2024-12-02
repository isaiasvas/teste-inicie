import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TaskDeleteConfirmationComponent } from './task-delete-confirmation/task-delete-confirmation.component';


type TaskStatus = 'pendente' | 'concluída';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  standalone: false
})
export class TasksComponent implements OnInit {
  // Observáveis para tarefas pendentes e concluídas
  todo$ = new BehaviorSubject<Task[]>([]);
  done$ = new BehaviorSubject<Task[]>([]);
  // Tipo literal para o status da tarefa
  
  
  
  constructor(private tasksService: TasksService,private dialog: MatDialog,private snackBar: MatSnackBar, private bottomSheet: MatBottomSheet ) {}
  
  ngOnInit(): void {
    this.loadTasks(); // Carrega as tarefas ao inicializar o componente
  }
  
  /**
  * Carrega as tarefas do servidor e atualiza os observáveis.
  * 
  * @returns void
  * 
  */
  loadTasks(): void {
    this.tasksService.getTasks()
    .pipe(
      map((response) => {
        const tasks = response.tasks || []; // Garante que `tasks` é sempre um array
        const todo = tasks.filter(task => task.status === 'pendente');
        const done = tasks.filter(task => task.status === 'concluída');
        
        // Atualiza os observáveis com os valores separados
        this.todo$.next(todo);
        this.done$.next(done);
      })
    )
    .subscribe({
      error: (err) => console.error('Erro ao carregar tarefas:', err),
    });
  }
  
  /**
  *  Abre uma notificação com uma mensagem e uma ação.
  * 
  * @param {string} message A mensagem da notificação.
  * @param {string} action A ação da notificação.
  * @param {number} duration A duração da notificação em milissegundos.
  * 
  * @returns void
  * 
  */
  openSnackBar(message: string, action: string, duration: number = 3000): void {
    this.snackBar.open(message, action, {
      duration: duration,  // Duração da notificação
    });
  }
  
  
  /**
  * Abre um diálogo para adicionar uma nova tarefa.
  * 
  * O diálogo permite ao usuário inserir o título de uma nova tarefa.
  * Após o diálogo ser fechado, se um título for fornecido, a tarefa
  * é criada e adicionada à lista de tarefas pendentes.
  * 
  * @returns void
  */
  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent);
    
    dialogRef.afterClosed().subscribe(title => {
      if (title) {
        // Agora chamamos o método para criar a tarefa, passando o título
        this.createNewTask(title);
      }
    });
  }
  
  /**
  * Cria uma nova tarefa com o título recebido e a adiciona na lista de pendentes.
  * 
  * @param {string} title Título da nova tarefa.
  */
  createNewTask(title: string): void {
    this.tasksService.createTask(title).subscribe({
      next: (task) => {
        this.loadTasks(); // Atualiza as listas de tarefas
        this.openSnackBar('Tarefa criada com sucesso!', 'Fechar', 3000); // Snackbar de sucesso
      },
      error: (err) => {
        console.error('Erro ao criar tarefa:', err); 
        this.openSnackBar('Erro ao criar tarefa', 'Fechar', 3000); // Snackbar de erro
      },
    });
  }
  
  /**
  * Atualiza o status de uma tarefa entre 'pendente' e 'concluída'.
  * @param task A tarefa a ser atualizada.
  * @param newStatus O novo status a ser atribuído (pendente ou concluída).
  */
  updateTaskStatus(task: Task, newStatus: TaskStatus): void {
    this.tasksService.updateTaskStatus(task.id!, newStatus).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Erro ao atualizar status:', err),
    });
  }
  
  
  /**
  * Lógica de movimentação das tarefas entre listas.
  * @param {CdkDragDrop<Task[]>} event Dados do evento de drag-and-drop.
  */
  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer !== event.container) {
      const task = event.previousContainer.data[event.previousIndex];
      const newStatus = event.container.id === 'todoList' ? 'pendente' : 'concluída';
      
      this.tasksService.updateTaskStatus(task.id!, newStatus).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Erro ao atualizar status:', err),
      });
    }
  }
  
  /**
  * Exclui uma tarefa do servidor e recarrega as listas se a operação for bem-sucedida.
  * 
  * @param {Task} task Tarefa a ser excluída.
  * 
  */
  deleteTask(task: Task): void {
    const bottomSheetRef = this.bottomSheet.open(TaskDeleteConfirmationComponent);

  bottomSheetRef.afterDismissed().subscribe(result => {
      if (result) {
        this.tasksService.deleteTask(task.id!).subscribe({
          next: () => {
            console.log('Tarefa excluída:', task.title);
            this.loadTasks(); // Recarrega as listas após a exclusão
            this.openSnackBar('Tarefa excluída com sucesso!', 'Fechar', 3000); // Snackbar de sucesso
          },
          error: (err) => {
            console.error('Erro ao excluir tarefa:', err);
            this.openSnackBar('Erro ao excluir tarefa', 'Fechar', 3000); // Snackbar de erro
          },
        });
      }
    });
  }
  
}
