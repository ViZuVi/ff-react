export interface Filters {
  date_from: string | null,
  date_to: string | null,
  space_id: string | null,
  category_id: number[],
  account_id: string,
  user_id: string,
  type: string,
  search: string
}

export type TransactionsParams = Required<Pick<Filters, 'space_id'>> & Partial<Omit<Filters, 'space_id'>>;