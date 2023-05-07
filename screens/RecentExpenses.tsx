import React from "react";
import isWithinInterval from "date-fns/isWithinInterval";
import subDays from "date-fns/subDays";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { useExpenseContext } from "../store/expenses-context";

const getInterval = () => ({
  start: subDays(new Date(), 7),
  end: new Date(),
});

export const RecentExpenses: React.FC = () => {
  const { expenses } = useExpenseContext();

  const recentExpenses = expenses.filter((expense) => {
    return isWithinInterval(expense.date, getInterval());
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensePeriod="Last 7 days" />
  );
};
