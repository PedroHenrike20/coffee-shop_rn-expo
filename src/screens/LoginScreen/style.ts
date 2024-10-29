import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 12,
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#313131',
  },

  textStyle: {
    color: "#D8D8D8",
    fontSize: 28,
    textAlign: "center",
  },

  textButton: {
    color: '#A2A2A2',
    textDecorationLine: "underline"
},

  containerTextButton: {
    width: '100%',
    alignItems: 'flex-end',
  },

  containerLoading: {
    height: 45, 
    justifyContent: 'center'
  }
});

export default styles;
