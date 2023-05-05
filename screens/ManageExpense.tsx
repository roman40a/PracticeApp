import React, { useLayoutEffect } from "react";
import { Text } from "react-native";
import { useAppNavigation, useAppRoute } from "../util/useNavigation";

export const ManageExpense: React.FC = () => {
  const route = useAppRoute();
  const navigation = useAppNavigation();
  const editingExpenseId = route.params?.expenseId;
  const isEditing = Boolean(editingExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing]);

  return <Text>ManageExpense</Text>;
};
