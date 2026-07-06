export function formatTransactionAmount(amount: number) {
  return amount.toFixed(2);
}

export function isExpense(amount: number) {
  return amount < 0;
}
