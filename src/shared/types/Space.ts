import type { Account } from "./Account";
import type { Category } from "./Category";
import type { User } from "./User";

export interface BaseSpace {
  id: number;
  name: string;
  created_at: string;
}

export interface Space extends BaseSpace {
  categories: Category[];
  accounts: Account[];
  users: User[];
}

export interface CreateSpace {
  space_name: string;
  account_name: string;
  currency_id: number;
  amount: number;
}
