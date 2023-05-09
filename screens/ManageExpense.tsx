import React, { useCallback, useLayoutEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useAppNavigation, useAppRoute } from "../util/useNavigation";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useExpenseContext } from "../store/expenses-context";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import { TExpense } from "../components/ExpensesOutput/types";

export const ManageExpense: React.FC = () => {
  const route = useAppRoute();
  const navigation = useAppNavigation();
  const editingExpenseId = route.params?.expenseId;
  const isEditing = Boolean(editingExpenseId);

  const { updateExpense, addExpense, deleteExpense, expenses } =
    useExpenseContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing]);

  const closeHandler = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const deleteExpenseHandler = useCallback((): void => {
    if (editingExpenseId) {
      deleteExpense(editingExpenseId);
    }
    closeHandler();
  }, [closeHandler, deleteExpense]);

  const confirmHandler = useCallback(
    (data: Omit<TExpense, "id">): void => {
      if (isEditing) {
        if (editingExpenseId) {
          updateExpense({
            id: editingExpenseId,
            data,
          });
        }
      } else {
        addExpense(data);
      }
      closeHandler();
    },
    [closeHandler]
  );

  const selectedExpense = useMemo(() => {
    return expenses.find(({ id }) => id === editingExpenseId);
  }, [editingExpenseId]);

  return (
    <View style={styles.form}>
      <ExpenseForm
        onSubmit={confirmHandler}
        onClose={closeHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        initialData={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
