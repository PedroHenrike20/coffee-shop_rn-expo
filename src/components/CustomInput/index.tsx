import React, { LegacyRef } from "react";
import { Platform, Text, TextInput, TextInputProps, View } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface PropsCustomInput extends TextInputProps {
  iconPrefixSearch?: boolean;
  error?: string | undefined;
  label?: string;
  touched?: boolean | undefined;
}

const CustomInput: React.FC<PropsCustomInput> = React.memo(
  ({ iconPrefixSearch = false, error, label, touched, ...props }) => {
    return (
      <View style={styles.containerInputColumn}>
        {label && (
          <Text style={styles.labelStyle}>{label}</Text>
          // <MaterialCommunityIcons name="magnify" size={30} color="#A2A2A2" />
        )}
        <View style={styles.containerInput}>
          {iconPrefixSearch && (
            <MaterialCommunityIcons name="magnify" size={30} color="#A2A2A2" />
          )}
          <TextInput
            cursorColor="#A2A2A2"
            {...props}
            style={[
              styles.inputStyle,
              touched && error && styles.inputErrorStyle,
            ]}
            placeholderTextColor="#A2A2A2"
          />
        </View>
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      // <View style={[styles.containerInput, touched && error && styles.inputErrorStyle]}>
      //
      //   <TextInput
      //     cursorColor="#A2A2A2"
      //     {...props}
      //     style={styles.inputStyle}
      //     placeholderTextColor="#A2A2A2"
      //   />
      //   {touched && error && <Text style={styles.errorText}>{error}</Text>}
      // </View>
    );
  }
);

export default CustomInput;
