import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  containerGradiente: {
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 100,
  },

  containerRowHeader: {
    flexDirection: "row",
    gap: 14,
    justifyContent: "space-between",
    alignItems: 'center',
    width: '100%',
  },
  

  labelLocation: {
    fontSize: 14,
    color: "#A2A2A2",
    marginBottom: 8,
  },

  containerRowSearch: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  containerFlex: {
    flex: 1,
  },

  textStyleDropdown: {
    color: "#D8D8D8",
    fontSize: 16,
    fontWeight: 'bold',
    width: "100%",
  },

  inputStyleDropdown: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },

  containerSecundary: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
    alignContent: "center",
    backgroundColor: "#F9F9F9",
    gap: 16,
    paddingTop: 100,
  },

  containerNameUser: {
    height: 25,
  },

  textNameUser: {
    color: "#D8D8D8",
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: "center",
  }

  
});

export default styles;
