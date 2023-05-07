import {
  createContext,
  FC,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { TExpense } from "../components/ExpensesOutput/types";
import { DUMMY_EXPENSES } from "../components/ExpensesOutput/constants";

type TExpensesContext = {
  expenses: TExpense[];
  addExpense: (data: TAddPayload) => void;
  deleteExpense: (data: TDeletePayload) => void;
  updateExpense: (data: TUpdatePayload) => void;
};
const initialValue: TExpensesContext = {
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
};
export const ExpensesContext = createContext<TExpensesContext>(initialValue);

type TState = {
  expenses: TExpense[];
};

type TAddPayload = Omit<TExpense, "id">;
type TAddAction = {
  type: "ADD";
  payload: TAddPayload;
};
const addAction = (payload: TAddPayload): TAddAction => ({
  type: "ADD",
  payload,
});

const deleteAction = (payload: TDeletePayload): TDeleteAction => ({
  type: "DELETE",
  payload,
});
type TDeletePayload = TExpense["id"];
type TDeleteAction = {
  type: "DELETE";
  payload: TDeletePayload;
};

const updateAction = (payload: TUpdatePayload): TUpdateAction => ({
  type: "UPDATE",
  payload,
});
type TUpdatePayload = {
  id: TExpense["id"];
  data: Omit<TExpense, "id">;
};
type TUpdateAction = {
  type: "UPDATE";
  payload: TUpdatePayload;
};
type TAction = TAddAction | TDeleteAction | TUpdateAction;

const expensesReducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case "ADD": {
      const newExpense: TExpense = {
        id: Math.random().toString(10),
        ...action.payload,
      };

      const expenses = [newExpense, ...state.expenses];

      return {
        ...state,
        expenses,
      };
    }
    case "DELETE": {
      const expenses = state.expenses.filter(({ id }) => id !== action.payload);

      return {
        ...state,
        expenses,
      };
    }
    case "UPDATE": {
      const expenses = state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return {
            ...expense,
            ...action.payload.data,
          };
        }
        return expense;
      });

      return {
        ...state,
        expenses,
      };
    }
    default:
      return state;
  }
};

const initialState: TState = {
  expenses: DUMMY_EXPENSES,
};

type TExpensesContextProviderProps = {
  children: ReactElement | ReactElement[];
};
export const ExpensesContextProvider: FC<TExpensesContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(expensesReducer, initialState);
  const { expenses } = state;

  const addExpense = useCallback(
    (payload: TAddPayload): void => {
      dispatch(addAction(payload));
    },
    [dispatch]
  );
  const deleteExpense = useCallback(
    (payload: TDeletePayload): void => {
      dispatch(deleteAction(payload));
    },
    [dispatch]
  );
  const updateExpense = useCallback(
    (payload: TUpdatePayload): void => {
      dispatch(updateAction(payload));
    },
    [dispatch]
  );

  const value: TExpensesContext = useMemo(() => {
    return {
      expenses,
      addExpense,
      deleteExpense,
      updateExpense,
    };
  }, [expenses, addExpense, deleteExpense, updateExpense]);

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenseContext = (): TExpensesContext =>
  useContext<TExpensesContext>(ExpensesContext);
