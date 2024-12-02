import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-task-delete-confirmation',
  templateUrl: './task-delete-confirmation.component.html',
  styleUrls: ['./task-delete-confirmation.component.css'],
  standalone: false
})
export class TaskDeleteConfirmationComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<TaskDeleteConfirmationComponent>) {}

  onCancel(): void {
    this.bottomSheetRef.dismiss();
  }

  onConfirm(): void {
    this.bottomSheetRef.dismiss(true);  // Retorna true para confirmação
  }
}
