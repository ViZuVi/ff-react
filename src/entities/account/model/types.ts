import type { Currency } from "@/entities/currency/model/types";

export type Account = {
  id: number;
  created_at: string;
  name: string;
  currency: Currency;
  balance: string;
};

export type AccountCreate = {
  balance: number;
  currency_id: number;
  name: string;
  space_id: string;
};

export type AccountWithoutSpace = Omit<AccountCreate, "space_id">;
