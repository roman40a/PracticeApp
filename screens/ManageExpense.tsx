import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAppNavigation, useAppRoute } from "../util/hooks";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useExpenseContext } from "../store/expenses-context";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import { TExpense } from "../components/ExpensesOutput/types";
import {
  storeExpense,
  updateExpense as updateExpenseHttp,
  deleteExpense as deleteExpenseHttp,
} from "../util/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

export const ManageExpense: React.FC = () => {
  const route = useAppRoute();
  const navigation = useAppNavigation();
  const editingExpenseId = route.params?.expenseId;
  const isEditing = Boolean(editingExpenseId);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

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

  const deleteExpenseHandler = useCallback(async (): Promise<void> => {
    if (editingExpenseId) {
      try {
        setLoading(true);
        await deleteExpenseHttp(editingExpenseId);
        setError(undefined);
        deleteExpense(editingExpenseId);
        closeHandler();
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }
  }, [closeHandler, deleteExpense]);

  const confirmHandler = useCallback(
    async (data: Omit<TExpense, "id">): Promise<void> => {
      try {
        setLoading(true);
        if (isEditing) {
          if (editingExpenseId) {
            await updateExpenseHttp(editingExpenseId, data);
            updateExpense({
              id: editingExpenseId,
              data,
            });
          }
        } else {
          const expense = await storeExpense(data);
          addExpense(expense);
        }
        setError(undefined);
        closeHandler();
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    },
    [closeHandler]
  );

  const selectedExpense = useMemo(() => {
    return expenses.find(({ id }) => id === editingExpenseId);
  }, [editingExpenseId]);

  if (loading && !error) {
    return <LoadingOverlay />;
  }

  if (error && !loading) {
    return (
      <ErrorOverlay
        message={error.message}
        onConfirm={() => setError(undefined)}
      />
    );
  }

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
