import { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { TextInputProps } from "react-native/Libraries/Components/TextInput/TextInput";
import { GlobalStyles } from "../../constants/styles";

type TInputProps = {
  label: string;
  textInputProps?: TextInputProps;
  style?: StyleProp<ViewStyle>;
};
export const Input: FC<TInputProps> = ({ label, textInputProps, style }) => {
  return (
    <View style={[styles.form, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          textInputProps?.multiline && styles.inputMultiline,
        ]}
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  error: {},
});
