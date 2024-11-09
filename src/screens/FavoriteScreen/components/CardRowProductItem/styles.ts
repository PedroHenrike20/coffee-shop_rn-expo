import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerCard: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginVertical: 12,
        marginHorizontal: 24,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        gap: 8,
        flexDirection: "row",
        height: 140,
    },

    imgProduct: {
        width: 125,
        height: "100%",
        resizeMode: "cover",
        borderRadius: 16,
    },

    containerRowAssessment: {
        flexDirection: "row",
        gap: 4,
        position: "absolute",
        left: 88,
        top: 14,
        alignItems: "center",
    },

    textAssessmentProduct: {
        color: "#FFF",
        fontSize: 10,
        fontWeight: "semibold"
    },

    containerContent: {
        gap: 4,
        maxHeight: "100%",
        height: "100%",
        justifyContent: "space-between",
        flex: 1,
    },

    titleProdut: {
        color: "#242424",
        fontWeight: "bold",
        fontSize: 16,
    },

    descriptionProdut: {
        color: "#A2A2A2",
        fontWeight: "regular",
        fontSize: 12,
    },

    containerDescription: {
        width: "100%",
        alignItems: "flex-start",
        gap: 4,
    },

    textPriceProduct: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#050505",
    },

    containerRowAction: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    
    addProductButton: {
        backgroundColor: "#C67C4E",
        padding: 8,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default styles;