import { GetFunction, SetFunction } from "../../common";
import { TransactionStore, TransactionStoreActions } from "./types";

export const transactionActions = (
  set: SetFunction<TransactionStore>,
  _get: GetFunction<TransactionStore>,
): TransactionStoreActions => ({
  setTransactions: (transactions) => set({ transactions }),
});
