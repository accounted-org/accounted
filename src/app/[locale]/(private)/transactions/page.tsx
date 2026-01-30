"use client";

import { useTransactionStore } from "@/src/lib";
import { useTranslations } from "next-intl";

export default function TransactionsPage() {
  const { transactions } = useTransactionStore();
  const t = useTranslations("transactions");

  return (
    <div>
      <h1>{t("title")}</h1>
      {transactions.length === 0 ? (
        <p>{t("no_transactions")}</p>
      ) : (
        transactions.map((transaction) => (
          <div key={transaction.id}>
            <p>ID: {transaction.id}</p>
            <p>
              {t("amount")}: {transaction.amount}
            </p>
            <p>
              {t("date")}: {transaction.date}
            </p>
            {"source" in transaction ? (
              <p>
                {t("source")}: {transaction.source}
              </p>
            ) : (
              <p>
                {t("category")}: {transaction.category}
              </p>
            )}
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
