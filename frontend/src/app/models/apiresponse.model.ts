import { Task } from "./task.model";

export interface ApiResponse {
  tasks: Task[]; // Deve ser um array de tarefas
  status: boolean;
}
