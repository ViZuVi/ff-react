export type ApiStatus = 'success' | 'error'

export interface ApiRespons<T> {
    data: T;
    status: ApiStatus
}