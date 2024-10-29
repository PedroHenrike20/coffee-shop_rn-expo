import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#F9F9F9",
        gap: 16,
    },

    containerImg: {
        width: "100%",
        height: 202,
    },
    
    imgProduct: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 16,
    },

    containerRowDetails: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"

    },

    containerColumnDetails: {
        gap: 16,
    },

    containerText: {
        gap: 4,
    },

    textTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#242424",
    },

    legendProduct: {
        fontSize: 14,
        color: "#A2A2A2",
        width: 100
    },

    containerAssessment: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center"
    },

    textAssessment: {
        fontSize: 18,
        color: "#2A2A2A",
        fontWeight: "bold"
    },

    textQuantity: {
        fontSize: 12,
        color: "#A2A2A2",
    },

    containerRowAction: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
        marginTop: 6,
    },

    borderDivider: {
        borderWidth: 1,
        borderColor: "#E3E3E3",
        width: "95%",
        alignSelf: "center",
        paddingHorizontal: 50,
        marginTop: 16,
    },

    containerTypeDrinkButton: {
        alignItems: "center"
    },

    containerDescription: {
        gap: 8,
    },

    labelContent: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#242424",
    },

    textDescription: {
        fontSize: 14,
        color: "#A2A2A2"
    },

    containerSizeDrink: {
        gap: 16,
    },

    containerRowSizeDrinkButton: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    containerTextButtonSize: {
        paddingHorizontal: 42,
        paddingVertical: 10,
    },

});

export default styles;