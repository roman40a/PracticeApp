import axios from "axios";
import parseISO from "date-fns/parseISO";
import { TExpense } from "../components/ExpensesOutput/types";

const ROOT_URL =
  "https://react-native-course-862ba-default-rtdb.firebaseio.com";
const EXPENSES_URL = `${ROOT_URL}/expenses.json`;

export const storeExpense = async (
  expenseData: Omit<TExpense, "id">
): Promise<TExpense> => {
  const res = await axios.post(EXPENSES_URL, expenseData);
  return {
    id: res.data.name,
    ...expenseData,
  };
};

export const fetchExpenses = async (): Promise<TExpense[]> => {
  const response = await axios.get(EXPENSES_URL);

  const expenses: TExpense[] = Object.keys(response.data).map((id) => ({
    id,
    amount: response.data[id].amount,
    date: parseISO(response.data[id].date),
    description: response.data[id].description,
  }));

  return expenses;
};

export const updateExpense = (
  id: string,
  expenseData: Omit<TExpense, "id">
) => {
  return axios.put(`${ROOT_URL}/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id: string) => {
  return axios.delete(`${ROOT_URL}/expenses/${id}.json`);
};
