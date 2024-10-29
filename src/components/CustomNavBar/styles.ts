import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    containerNavBar: {
        flexDirection: "row",
        height: 29,
    },

    tabButtonNav: {
        width: "auto", 
        paddingVertical: 4,
        paddingHorizontal: 8,
        justifyContent: "center",
        borderRadius: 6,
        marginHorizontal: 8,
    },

    textTab: {
        fontWeight: "bold",
        fontSize: 14,
    }
});

export default styles;