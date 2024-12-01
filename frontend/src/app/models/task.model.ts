export interface Task {
    id?: number;
    title: string;
    status: 'pendente' | 'concluída'; // Apenas esses dois valores
    completed_at: string | null; // Pode ser `null` se ainda não estiver concluída
  }
  