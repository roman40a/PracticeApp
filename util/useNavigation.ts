import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProp, RouteProp } from "@react-navigation/core/src/types";

type TParamList = {
  ManageExpense: { expenseId: string } | undefined;
  ExpensesOverview: undefined;
};
export const useAppNavigation = useNavigation<NavigationProp<TParamList>>;

export const useAppRoute = useRoute<RouteProp<TParamList>>;
