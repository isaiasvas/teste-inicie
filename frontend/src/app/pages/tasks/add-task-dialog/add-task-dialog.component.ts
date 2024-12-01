import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  standalone: false,  // Define como no-standalone
})
export class AddTaskDialogComponent {
  taskForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
    });
  }

  save(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close({ title: this.taskForm.value.title, status: 'pendente' });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
