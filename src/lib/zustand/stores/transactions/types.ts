import {
  ExpenseTransaction,
  IncomeTransaction,
  Transaction,
} from '@/src/@types'

export type TransactionStoreActions = {
  setTransactions: (
    transactions: (IncomeTransaction | ExpenseTransaction)[]
  ) => void
}

export type TransactionStoreState = {
  transactions: Transaction[]
}

export type TransactionStore = TransactionStoreState & TransactionStoreActions
