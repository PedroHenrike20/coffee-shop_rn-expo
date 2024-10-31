import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { setCategorySelected, setListProductsFiltered } from "@/src/redux/storeSlice";

export interface TabNavBar {
  title: string;
  value: string;
}

type CustomNavBarProps = {
  tabs: TabNavBar[];
};

const CustomNavBar: React.FC<CustomNavBarProps> = ({ tabs }) => {
  const dispatch = useDispatch();
  const { categorySelected } = useSelector(
    (value: RootState) => value.store
  );


  return (
    <ScrollView
      style={styles.containerNavBar}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {tabs.map((itemTab, index) => (
        <TouchableOpacity
          onPress={() => dispatch(setCategorySelected(itemTab.value))}
          key={index}
          style={[
            styles.tabButtonNav,
            {
              backgroundColor:
              categorySelected === itemTab.value ? "#C67C4E" : "#EDEDED",
            },
          ]}
        >
          <Text
            style={[
              styles.textTab,
              { color: categorySelected === itemTab.value ? "#FFF" : "#313131" },
            ]}
          >
            {itemTab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CustomNavBar;
