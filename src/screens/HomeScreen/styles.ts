import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
        backgroundColor: '#000',
        alignItems: 'center'

    },

    backgroundImg: {
        width: '100%',
        resizeMode: 'cover'
    },

    containerSecundary: {
        marginHorizontal:  24,
        gap: 32,
        top: "60%",
        position: 'absolute',
    },

    containerMessage: {
        gap: 8,
    },

    messageTextMain: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 30,
        textAlign: 'center',
        marginHorizontal: 24

    },

    messageText: {
        color: '#A2A2A2',
        textAlign: 'center',
        fontSize: 14,
        marginHorizontal: 16
    },
});

export default styles;