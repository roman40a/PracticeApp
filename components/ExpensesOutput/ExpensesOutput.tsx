import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ExpensesSummary } from "./ExpensesSummary";
import { ExpensesList } from "./ExpensesList";
import { TExpense } from "./types";
import { GlobalStyles } from "../../constants/styles";

type TExpensesOutputProps = {
  expensePeriod: string; // Last 7 days
  expenses: TExpense[];
};
export const ExpensesOutput: FC<TExpensesOutputProps> = ({
  expenses,
  expensePeriod,
}) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensePeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});
