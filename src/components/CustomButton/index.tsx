import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "./styles";

type PropsIcon = {
  icon?: string | any;
  colorIcon?: string;
  image?: ImageSourcePropType;
  position: "left" | "right" | "center";
};

interface PropsButton extends TouchableOpacityProps {
  title?: String;
  icon?: PropsIcon;
  isDisabled?: boolean,
  color?: "primary" | "secundary" | "transparent";
}

const CustomButton: React.FC<PropsButton> = React.memo(({
  title,
  icon,
  isDisabled = false,
  color = "primary",
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      {...props}
      style={[
        styles.buttonStyle,
        { backgroundColor: color === "primary" ? "#C67C4E" : color === "secundary" ? "#d7bfb0" : "transparent" },
        isDisabled && {backgroundColor: "#C67C4E99"},
      ]}
    >
      <View style={styles.containerButton}>
        {icon?.image && (icon?.position === "left" || icon?.position === "center" ) && (
          <Image source={icon.image} style={styles.imgButton} />
        )}
        {icon?.icon && (icon?.position === "left" || icon?.position === "center") && (
          <MaterialCommunityIcons
            name={icon.icon}
            size={24}
            color={icon.colorIcon}
          />
        )}
        {title && <Text style={[styles.textStyleButton, isDisabled && {color: "#C67C6399"}]}>{title}</Text>}
        {icon?.image && icon?.position === "right" && (
          <Image source={icon.image} style={styles.imgButton} />
        )}
        {icon?.icon && icon?.position === "right" && (
          <MaterialCommunityIcons
            name={icon.icon}
            size={24}
            color={icon.colorIcon}
          />
        )}
      </View>
    </TouchableOpacity>
  );
});

export default CustomButton;
