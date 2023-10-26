export interface Category {
  name: string;
  id: number;
}

export interface DataState<TData> {
  data: TData;
  error: string;
  loading: boolean;
}

export interface FecthResponse<TData> {
  res: TData;
}
