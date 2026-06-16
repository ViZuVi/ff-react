export interface Filters {
  date_from: string,
  date_to: string,
  space_id: string | null,
  category_id: number[],
  account_id: number,
  user_id: number,
  type: number,
  search: string
}

export type TransactionsParams = Required<Pick<Filters, 'space_id'>> & Partial<Omit<Filters, 'space_id'>>;