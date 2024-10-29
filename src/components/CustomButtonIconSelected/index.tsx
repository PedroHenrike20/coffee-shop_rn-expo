import React, { ReactNode } from "react";
import { TouchableOpacityProps, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface CustomButtonIconSelectedProps extends TouchableOpacityProps {
  isSelected: boolean;
  children: ReactNode;
}

const CustomButtonIconSelected: React.FC<CustomButtonIconSelectedProps> = ({
  isSelected,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.actionItemButton,
        {
          backgroundColor: isSelected ? "#F9F2ED" : "#FFF",
          borderColor: isSelected ? "#C67C4E" : "#E3E3E3",
        },
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default CustomButtonIconSelected;
