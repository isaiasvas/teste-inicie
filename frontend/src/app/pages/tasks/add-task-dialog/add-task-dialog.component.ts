import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css'],
  standalone: false,  // Define como no-standalone
})
export class AddTaskDialogComponent {
  taskForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    private fb: FormBuilder,
    private tasksService: TasksService 
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
    });
  }

  
  /**
   * Fecha o dialogo e retorna o titulo da tarefa quando o formulario é valido.
   * Caso contrario, não fecha o dialogo e não retorna nada.
   */
  save(): void {
    if (this.taskForm.valid) {
      const title = this.taskForm.value.title;
      this.dialogRef.close(title); // Retorna apenas o título da tarefa
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
