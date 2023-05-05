import { FC, ReactElement } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

type TName = keyof typeof Ionicons.glyphMap;

type TIconButton<GLYPHS extends TName> = IconProps<GLYPHS>;

export const IconButton = <GLYPHS extends TName>(
  props: TIconButton<GLYPHS>
): ReactElement => {
  const { size, name, color, onPress } = props;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={name} size={size} color={color} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
