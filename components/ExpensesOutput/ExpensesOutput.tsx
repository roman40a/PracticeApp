import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
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
    <View style={styles.form}>
      <ExpensesSummary expenses={expenses} periodName={expensePeriod} />
      {expenses.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No Expenses</Text>
          <AntDesign name="inbox" size={48} color="white" />
        </View>
      ) : (
        <ExpensesList expenses={expenses} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  noDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noDataText: {
    color: "white",
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
  },
});
