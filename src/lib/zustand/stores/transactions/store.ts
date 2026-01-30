import { createStore, useStore } from "zustand";

import { TransactionStore } from "./types";
import { transactionActions } from "./actions";

export const transactionStore = createStore<TransactionStore>((set, get) => ({
  transactions: [
    {
      amount: 100,
      category: "Groceries",
      date: "2026-01-27T01:56:04.513Z",
      id: "1",
      source: "Supermarket",
    },
  ],
  ...transactionActions(set, get),
}));

export function useTransactionStore() {
  return useStore(transactionStore);
}
