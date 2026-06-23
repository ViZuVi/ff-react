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

export interface CreateTransaction extends BaseTransaction {
  account_id: number | null;
  category_id: number | null;
  space_id: number | null;
}

export interface UpdateTransaction extends CreateTransaction {
  id: number;
}

export interface Transaction extends BaseTransaction {
  id: number;
  account: AccountType;
  type: TransactionType;
  category: CategoryType;
  user_name: string;
  editable: boolean;
}

export interface TransactionDraft extends CreateTransaction {
  localId: string;
  type: number | null;
}
