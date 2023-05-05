import { FC } from "react";
import { FlatList } from "react-native";
import { TExpense } from "./types";
import { ListRenderItem } from "react-native/Libraries/Lists/VirtualizedList";
import { ExpenseItem } from "./ExpenseItem";

const renderExpenseItem: ListRenderItem<TExpense> = ({ item }) => (
  <ExpenseItem
    id={item.id}
    description={item.description}
    amount={item.amount}
    date={item.date}
  />
);

const keyExtractor = (item: TExpense) => item.id;

type TExpensesListProps = {
  expenses: TExpense[];
};
export const ExpensesList: FC<TExpensesListProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={keyExtractor}
    />
  );
};
