import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TExpense } from "./types";
import { GlobalStyles } from "../../constants/styles";

type TExpensesSummaryProps = {
  periodName: string;
  expenses: TExpense[];
};
export const ExpensesSummary: FC<TExpensesSummaryProps> = ({
  periodName,
  expenses,
}) => {
  const expensesSum = expenses.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);
  return (
    <View style={styles.form}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>{`$${expensesSum.toFixed(2)}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
