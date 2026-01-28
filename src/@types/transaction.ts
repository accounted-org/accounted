export type IncomeTransaction = {
  id: string;
  amount: number;
  date: string;
  source: string;
};

export type ExpenseTransaction = {
  id: string;
  amount: number;
  date: string;
  category: string;
};

export type Transaction = IncomeTransaction | ExpenseTransaction;
