export interface ApiRespons<T> {
    data: T;
    status: 'success' | 'error'
}