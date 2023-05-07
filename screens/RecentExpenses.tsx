import React from "react";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { useExpenseContext } from "../store/expenses-context";

export const RecentExpenses: React.FC = () => {
  const { expenses } = useExpenseContext();
  return <ExpensesOutput expenses={expenses} expensePeriod="Last 7 days" />;
};
