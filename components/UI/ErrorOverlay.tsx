import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Button } from "./Button";

type TErrorOverlayProps = {
  message: string;
  onConfirm: () => void;
};
export const ErrorOverlay: FC<TErrorOverlayProps> = ({
  message,
  onConfirm,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
  },
});
