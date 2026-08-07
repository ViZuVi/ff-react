import type { Account } from "@/entities/account";
import type { Category } from "@/entities/category";
import type { User } from "@/entities/user";

export interface BaseSpace {
  id: number;
  name: string;
  created_at: string;
}

export interface Space {
  space: BaseSpace;
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
