export type PriorityType = "1" | "2" | "3";

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
