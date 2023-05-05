import React, { useLayoutEffect } from "react";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export const ManageExpense: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const editingExpenseId: string | undefined = route?.params?.expenseId;
  const isEditing = Boolean(editingExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing]);

  return <Text>ManageExpense</Text>;
};
