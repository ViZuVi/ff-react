export type ApiStatus = "success" | "error";

export interface ApiResponse<T> {
  data: T;
  status: ApiStatus;
}
