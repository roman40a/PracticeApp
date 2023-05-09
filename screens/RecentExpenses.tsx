import React, { useEffect, useState } from "react";
import subDays from "date-fns/subDays";
import isAfter from "date-fns/isAfter";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { useExpenseContext } from "../store/expenses-context";
import { fetchExpenses } from "../util/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

export const RecentExpenses: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const { expenses, setExpenses } = useExpenseContext();

  const recentExpenses = expenses.filter((expense) => {
    return isAfter(expense.date, subDays(new Date(), 7));
  });

  async function getExpenses() {
    setLoading(true);
    try {
      const expenses = await fetchExpenses();
      setExpenses(expenses);
      setError(undefined);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getExpenses();
  }, []);

  if (loading && !error) {
    return <LoadingOverlay />;
  }

  if (error && !loading) {
    return <ErrorOverlay message={error.message} onConfirm={getExpenses} />;
  }

  return (
    <ExpensesOutput expenses={recentExpenses} expensePeriod="Last 7 days" />
  );
};
