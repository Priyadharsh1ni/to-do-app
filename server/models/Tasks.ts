interface TaskParams {
  id: string;
}

interface TaskBody {
  title: string;
  description?: string;
  completed?: boolean;
}