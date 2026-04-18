export interface PaginateResponse<T> {
  data: T[];
  meta: Meta;
}


export interface Meta {
  total: number;
  limit: number;
  offset: number;
}
