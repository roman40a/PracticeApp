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

type TExpensesContext = {
  expenses: TExpense[];
  addExpense: (data: TAddPayload) => void;
  deleteExpense: (data: TDeletePayload) => void;
  updateExpense: (data: TUpdatePayload) => void;
  setExpenses: (expenses: TExpense[]) => void;
};
const initialValue: TExpensesContext = {
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
  setExpenses: () => {},
};
export const ExpensesContext = createContext<TExpensesContext>(initialValue);

type TState = {
  expenses: TExpense[];
};

type TAddPayload = TExpense;
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

const setAction = (payload: TSetPayload): TSetAction => ({
  type: "SET",
  payload,
});
type TSetPayload = TExpense[];
type TSetAction = {
  type: "SET";
  payload: TSetPayload;
};

type TAction = TAddAction | TDeleteAction | TUpdateAction | TSetAction;

const expensesReducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case "ADD": {
      const expenses = [action.payload, ...state.expenses];

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
    case "SET": {
      return {
        ...state,
        expenses: action.payload.reverse(),
      };
    }
    default:
      return state;
  }
};

const initialState: TState = {
  expenses: [],
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
  const setExpenses = useCallback(
    (payload: TSetPayload): void => {
      dispatch(setAction(payload));
    },
    [dispatch]
  );

  const value: TExpensesContext = useMemo(() => {
    return {
      expenses,
      addExpense,
      deleteExpense,
      updateExpense,
      setExpenses,
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
