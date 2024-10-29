import React, { Component } from "react";
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
  color?: "primary" | "secundary" | "transparent";
}

const CustomButton: React.FC<PropsButton> = ({
  title,
  icon,
  color = "primary",
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.buttonStyle,
        { backgroundColor: color === "primary" ? "#C67C4E" : color === "secundary" ? "#d7bfb0" : "transparent" },
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
        {title && <Text style={styles.textStyleButton}>{title}</Text>}
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
};

export default CustomButton;
