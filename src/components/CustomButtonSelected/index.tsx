import React, { ReactNode } from "react";
import { TouchableOpacityProps, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface CustomButtonSelectedProps extends TouchableOpacityProps {
  isSelected: boolean;
  isActive?: boolean;
  children: ReactNode;
}

const CustomButtonSelected: React.FC<CustomButtonSelectedProps> = React.memo(({
  isSelected,
  isActive = true,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.actionItemButton,
        {
          backgroundColor: isSelected ? "#F9F2ED" : !isActive ? "#E3E3E3" : "#FFF",
          borderColor: isSelected ? "#C67C4E" : "#E3E3E3",
        },
      ]}
    >
      {children}
    </TouchableOpacity>
  );
});

export default CustomButtonSelected;
