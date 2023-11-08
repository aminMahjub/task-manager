export type PriorityType = 1 | 2 | 3 | null;

export interface Task {
  priority: PriorityType;
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface FecthResponse<TData> {
  res: TData;
}
