import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {        
        gap: 12,
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        backgroundColor: '#313131',
    },

    textStyle: {
        color: '#D8D8D8',
        fontSize: 28,
        textAlign: "center",
        marginBottom: 40
    },

    containerLoading: {
        height: 45,
        justifyContent: "center"
    }
});

export default styles;