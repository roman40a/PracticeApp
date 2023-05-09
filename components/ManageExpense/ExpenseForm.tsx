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
import isValid from "date-fns/isValid";
import { Input } from "./Input";
import { Button } from "../UI/Button";
import { TExpense } from "../ExpensesOutput/types";
import { GlobalStyles } from "../../constants/styles";

type TInputItem = {
  value: string;
  isValid: boolean;
};
export type TInput = {
  amount: TInputItem;
  date: TInputItem;
  description: TInputItem;
};

const INITIAL_INPUT_ITEM: TInputItem = {
  value: "",
  isValid: true,
};
const INITIAL_INPUT: TInput = {
  amount: INITIAL_INPUT_ITEM,
  date: INITIAL_INPUT_ITEM,
  description: INITIAL_INPUT_ITEM,
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
          amount: { value: initialData.amount.toString(10), isValid: true },
          description: { value: initialData.description, isValid: true },
          date: {
            value: format(initialData.date, "yyyy-MM-dd"),
            isValid: true,
          },
        }
      : INITIAL_INPUT
  );

  const inputChangeHandler = useCallback(
    (field: keyof TInput, value: string): void => {
      setInput((prevInput) => ({
        ...prevInput,
        [field]: { value, isValid: true },
      }));
    },
    []
  );

  const submitHandler = useCallback((): void => {
    const expenseData: Omit<TExpense, "id"> = {
      amount: parseFloat(input.amount.value),
      description: input.description.value,
      date: parse(input.date.value, "yyyy-MM-dd", new Date()),
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = isValid(expenseData.date);
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      onSubmit(expenseData);
    } else {
      setInput((prevInput) => ({
        amount: { value: prevInput.amount.value, isValid: amountIsValid },
        date: { value: prevInput.date.value, isValid: dateIsValid },
        description: {
          value: prevInput.description.value,
          isValid: descriptionIsValid,
        },
      }));
    }
  }, [input, onSubmit]);

  console.log(input);

  const formIsInvalid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid;

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
                value: input.amount.value,
                onChangeText: (value) => inputChangeHandler("amount", value),
              }}
              style={styles.rowInput}
              isInvalid={!input.amount.isValid}
            />
            <Input
              label="Date"
              textInputProps={{
                placeholder: "YYYY-MM-DD",
                maxLength: 10,
                value: input.date.value,
                onChangeText: (value) => inputChangeHandler("date", value),
              }}
              style={styles.rowInput}
              isInvalid={!input.date.isValid}
            />
          </View>

          <Input
            label="Description"
            textInputProps={{
              multiline: true,
              value: input.description.value,
              onChangeText: (value) => inputChangeHandler("description", value),
              // autoCapitalize: "none",
              // autoCorrect: false,
            }}
            isInvalid={!input.description.isValid}
          />
          {formIsInvalid && (
            <Text style={styles.errorText}>
              Form is invalid - please check your input
            </Text>
          )}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
