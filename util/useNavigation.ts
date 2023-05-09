import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProp, RouteProp } from "@react-navigation/core/src/types";

type TParamList = {
  ExpensesOverview: undefined;
  ManageExpense?: { expenseId: string };
};
export const useAppNavigation = useNavigation<NavigationProp<TParamList>>;

export const useAppRoute = useRoute<RouteProp<TParamList>>;
