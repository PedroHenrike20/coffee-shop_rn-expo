import React from "react";
import { Platform, TextInput, TextInputProps, View } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface PropsCustomInput extends TextInputProps {
  iconPrefixSearch?: boolean;
}

const CustomInput: React.FC<PropsCustomInput> = ({
  iconPrefixSearch = false,
  ...props
}) => {
  return (
    <View style={styles.containerInput}>
      {iconPrefixSearch && (
        <MaterialCommunityIcons  name="magnify" size={30} color="#A2A2A2"/>
      )}
      <TextInput
      cursorColor="#A2A2A2"
        {...props}
        style={styles.inputStyle}
        placeholderTextColor="#A2A2A2"
      />
    </View>
  );
};

export default CustomInput;
