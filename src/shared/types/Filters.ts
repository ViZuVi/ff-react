export interface Filters {
  date_from: string | null,
  date_to: string | null,
  space_id: string | null,
  category_id: number[] | null,
  account_id: number | null,
  user_id: number | null,
  type: number | null,
  search: string
}

export type TransactionsParams = Required<Pick<Filters, 'space_id'>> & Partial<Omit<Filters, 'space_id'>>;