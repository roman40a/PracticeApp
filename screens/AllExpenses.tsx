import React from "react";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../components/ExpensesOutput/constants";

export const AllExpenses: React.FC = () => {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} expensePeriod="Total" />;
};
