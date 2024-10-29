import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttonStyle: {
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        width: '100%',
    },

    textStyleButton: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },

    containerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        gap: 8,
    },

    imgButton: {
        width: 30,
        height: 30,
        resizeMode: 'cover'
    }
});

export default styles;