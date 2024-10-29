import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    containerCard: {
        position: 'absolute',
        top:  -65,
        left: 0,
        right: 0,
        marginHorizontal: 24, 
    },
    
    imageBackgroundStyle: {
        borderRadius: 16,
        width: "100%",
        resizeMode: 'cover'
    },

    containerContent: {
        position: "absolute",
        marginLeft: 24,
        marginVertical: 13,
        gap: 8,
        alignItems: 'flex-start'
    },

    containerTag: {
        width: "auto",
        backgroundColor: "#ED5151",
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 4,

    },

    textTag: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
    },

    textCard: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 30,
        lineHeight: 40,
        position: "relative",
        zIndex: 1,
    }, 

    containerHighlight_1: {
        width: 191,
        height: 25,
        position: 'absolute',
        bottom: 12,
        left: -2,
    },

    containerHighlight_2: {
        width: 260,
        height: 26,
        position: 'absolute',
        bottom: 48,
        left: -2,
    }
});

export default styles;