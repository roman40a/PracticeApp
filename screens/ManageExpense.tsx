import React, { useCallback, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useAppNavigation, useAppRoute } from "../util/useNavigation";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { Button } from "../components/UI/Button";
import { useExpenseContext } from "../store/expenses-context";

export const ManageExpense: React.FC = () => {
  const route = useAppRoute();
  const navigation = useAppNavigation();
  const editingExpenseId = route.params?.expenseId;
  const isEditing = Boolean(editingExpenseId);

  const { addExpense, deleteExpense, updateExpense } = useExpenseContext();

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

  const cancelHandler = useCallback((): void => {
    closeHandler();
  }, [closeHandler]);

  const confirmHandler = useCallback((): void => {
    if (isEditing) {
      if (editingExpenseId) {
        updateExpense({
          id: editingExpenseId,
          data: {
            description: "Updated expense",
            amount: 1,
            date: new Date(),
          },
        });
      }
    } else {
      addExpense({
        description: "Added expense",
        amount: 0,
        date: new Date(),
      });
    }
    closeHandler();
  }, [closeHandler]);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={cancelHandler} mode="flat">
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  container: {
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
