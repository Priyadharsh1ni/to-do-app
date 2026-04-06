export interface TaskParams {
  id: string;
}

export interface TaskBody {
  title: string;
  description?: string;
  completed?: boolean;
  status?: number;
}