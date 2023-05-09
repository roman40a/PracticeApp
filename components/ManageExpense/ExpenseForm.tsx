import React, { FC, useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import parse from "date-fns/parse";
import format from "date-fns/format";
import { Input } from "./Input";
import { Button } from "../UI/Button";
import { TExpense } from "../ExpensesOutput/types";

export type TInput = {
  amount: string;
  date: string;
  description: string;
};
const INITIAL_INPUT: TInput = {
  amount: "",
  date: "",
  description: "",
};

type TExpenseFormProps = {
  onSubmit: (data: Omit<TExpense, "id">) => void;
  onClose: () => void;
  submitButtonLabel: string;
  initialData?: TExpense;
};
export const ExpenseForm: FC<TExpenseFormProps> = ({
  onClose,
  submitButtonLabel,
  onSubmit,
  initialData,
}) => {
  const [input, setInput] = useState<TInput>(
    initialData
      ? {
          amount: initialData.amount.toString(10),
          description: initialData.description,
          date: format(initialData.date, "yyyy-MM-dd"),
        }
      : INITIAL_INPUT
  );
  console.log(input, initialData);

  const inputChangeHandler = useCallback(
    (field: keyof TInput, value: string): void => {
      setInput((prevInput) => ({
        ...prevInput,
        [field]: value,
      }));
    },
    []
  );

  const submitHandler = useCallback((): void => {
    const expenseData: Omit<TExpense, "id"> = {
      amount: parseFloat(input.amount),
      description: input.description,
      date: parse(input.date, "yyyy-MM-dd", new Date()),
    };

    onSubmit(expenseData);
  }, []);

  return (
    <ScrollView style={styles.form}>
      <KeyboardAvoidingView style={styles.form} behavior="padding">
        <View style={styles.form}>
          <Text style={styles.title}>Your Expense</Text>
          <View style={styles.inputsRow}>
            <Input
              label="Amount"
              textInputProps={{
                keyboardType: "decimal-pad",
                value: input.amount,
                onChangeText: (value) => inputChangeHandler("amount", value),
              }}
              style={styles.rowInput}
            />
            <Input
              label="Date"
              textInputProps={{
                placeholder: "YYYY-MM-DD",
                onChangeText: (value) => inputChangeHandler("date", value),
                maxLength: 10,
                value: input.date,
              }}
              style={styles.rowInput}
            />
          </View>

          <Input
            label="Description"
            textInputProps={{
              onChangeText: (value) => inputChangeHandler("description", value),
              multiline: true,
              value: input.description,
              // autoCapitalize: "none",
              // autoCorrect: false,
            }}
          />
          <View style={styles.buttons}>
            <Button style={styles.button} onPress={onClose} mode="flat">
              Cancel
            </Button>
            <Button style={styles.button} onPress={submitHandler}>
              {submitButtonLabel}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
