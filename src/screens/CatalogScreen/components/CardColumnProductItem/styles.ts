import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerCard: {
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 12,
        marginVertical: 12,
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        gap: 8,
    },

    imgProduct: {
        width: 164,
        height: 150,
        resizeMode: "cover",
        borderRadius: 16,
    },

    containerRowAssessment: {
        flexDirection: "row",
        gap: 4,
        position: "absolute",
        right: 20,
        top: 18,
        alignItems: "center",
    },

    textAssessmentProduct: {
        color: "#FFF",
        fontSize: 10,
        fontWeight: "semibold"
    },

    containerContent: {
        gap: 8,
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