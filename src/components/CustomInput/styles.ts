import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerInput: {
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        height: 52,
        backgroundColor: '#2A2A2A',
    },
    containerInputColumn: {
        gap: 4,
        alignItems: "flex-start",
        height: 'auto',
    },
    
    inputStyle: {
        flex: 1,
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#2A2A2A',
        height: "100%",
        color: '#A2A2A2',
    },

    inputErrorStyle: {
        borderColor: '#ED5151',
        borderWidth: 1,
    },

    errorText: {
        color: '#ED5151',
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
        marginLeft: 6,
    },
    
    labelStyle: {
        color: "#EDEDED",
        fontSize: 16,
        marginLeft: 6,
    }
});

export default styles