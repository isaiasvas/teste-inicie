import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common'; // Adicionado
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
// Components
import { LoginComponent } from './pages/login/login.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AddTaskDialogComponent } from './pages/tasks/add-task-dialog/add-task-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop'; // Importação correta do DragDropModule
import {MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskDeleteConfirmationComponent } from './pages/tasks/task-delete-confirmation/task-delete-confirmation.component'; // Ajuste o caminho conforme necessário

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent,  
    AddTaskDialogComponent,
    TaskDeleteConfirmationComponent,
  ],
  imports: [
    MatSnackBarModule,
    MatBottomSheetModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    DragDropModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule, 
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
