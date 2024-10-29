import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./styles";

export interface TabNavBar {
  title: string;
  value: string;
}

type CustomNavBarProps = {
  tabs: TabNavBar[];
};

const CustomNavBar: React.FC<CustomNavBarProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].value);

    return (
      <ScrollView style={styles.containerNavBar} horizontal showsHorizontalScrollIndicator={false}>
        {tabs.map((itemTab, index) => (
          <TouchableOpacity onPress={() => setActiveTab(itemTab.value)} key={index} style={[styles.tabButtonNav, {backgroundColor: activeTab === itemTab.value ? "#C67C4E" : "#EDEDED"}]}>
            <Text style={[styles.textTab, {color: activeTab === itemTab.value ? "#FFF" : "#313131"}]}>{itemTab.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
  );
};

export default CustomNavBar;
