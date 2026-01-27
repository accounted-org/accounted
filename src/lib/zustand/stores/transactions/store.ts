import { createStore, useStore } from 'zustand';

import { TransactionStore } from './types';
import { transactionActions } from './actions';

export const transactionStore = createStore<TransactionStore>((set, get) => ({
  transactions: [],
  ...transactionActions(set, get),
}));

export function useTransactionStore() {
  return useStore(transactionStore);
}
