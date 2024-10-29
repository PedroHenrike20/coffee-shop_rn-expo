import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        width: "100%",
        height: 120,
        bottom: 0,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        paddingHorizontal: 24,
        paddingTop: 24,
        flexDirection: "row",
        gap: 34,

    },

    containerPriceProduct: {
        gap: 4,
        width: 130,
    },

    labelPrice: {
        fontSize: 14,
        color: "#909090"
    },

    textPrice: {
        color: "#C67C4E",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
    },

    containerButtonBuy: {
        width: 220,
    }
});

export default styles;