type TransactionType = {
  id: 0 | 1;
  name: string;
};

type CategoryType = {
  id: number;
  name: string;
};

type AccountType = {
  id: number;
  name: string;
};

interface BaseTransaction {
  created_at: string;
  amount: string;
  comment: string;
}

export interface Transaction extends BaseTransaction {
  id: number;
  account: AccountType;
  type: TransactionType;
  category: CategoryType;
  user_name: string;
  editable: boolean;
}

export interface TransactionFormData {
  created_at: string;
  amount: string;
  comment: string;

  account_id: number | null;
  category_id: number | null;
}

export interface CreateTransactionDto extends TransactionFormData {
  space_id: number;
}

export interface TransactionDraft extends CreateTransactionDto {
  localId: string;
  type: 0 | 1;
}

export interface UpdateTransactionDto extends TransactionFormData {
  id: number;
  space_id: number;
  type: 0 | 1;
}
