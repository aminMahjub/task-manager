export type PriorityType = 1 | 2 | 3 | null | undefined;

export interface Task {
  priority?: PriorityType;
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface FecthResponse<TData> {
  res: TData;
}
