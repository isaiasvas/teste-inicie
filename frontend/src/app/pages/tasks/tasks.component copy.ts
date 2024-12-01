import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiResponse } from '../../models/apiresponse.model';
import { Task } from '../../models/task.model';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  standalone: false
})
export class TasksComponent {
  tasks$: Observable<Task[]> = of([]);  // Inicializando com valor vazio
  todo$: Observable<Task[]> = of([]);   // Inicializando com valor vazio
  done$: Observable<Task[]> = of([]);   // Inicializando com valor vazio

  constructor(private taskService: TasksService, private dialog: MatDialog) {
    this.loadTasks();
  }

  // Carrega as tarefas do servidor
  loadTasks() {
    this.tasks$ = this.taskService.getTasks().pipe(
      map((tasks: Task[]) => {
        console.log(this.tasks$);
        const todo = tasks.filter(task => task.status === 'pendente');
        const done = tasks.filter(task => task.status === 'concluída');
        
        // Atribuindo as listas filtradas aos observables
        this.todo$ = of(todo);
        this.done$ = of(done);

        return tasks;  // Retorna todas as tarefas
      })
    
    );
    console.log(this.tasks$);
  }

  // Função que lida com a movimentação de tarefas entre as listas
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // Movendo dentro da mesma lista (não é o caso aqui, mas pode ser útil no futuro)
    } else {
      // Movendo entre listas (pendente <-> concluída)
      transferArrayItem(
        event.previousContainer.data || [], // Garante que é um array, mesmo que seja null
        event.container.data || [],          // Garante que é um array, mesmo que seja null
        event.previousIndex,
        event.currentIndex
      );
  
      // Atualiza o status das tarefas conforme o movimento
      this.updateTaskStatus();
    }
  }

  // Atualiza o status das tarefas após o movimento
  updateTaskStatus() {
    // Atualiza o status das tarefas pendentes
    this.todo$.subscribe(todo => {
      todo.forEach(task => task.status = 'pendente');
    });

    // Atualiza o status das tarefas concluídas
    this.done$.subscribe(done => {
      done.forEach(task => task.status = 'concluída');
    });
  }
}
