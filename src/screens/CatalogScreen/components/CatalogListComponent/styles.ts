import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerPrimary: {
    width: "100%",
    flex: 1,
  },

  containerSecundary: {
    flex: 1,
    width: "100%",
    padding: 24,
    alignContent: "center",
    gap: 16,
  },

  containerListCatalogWrapper: {
    justifyContent: "flex-start",
    marginHorizontal: 24,
  },

  containerContentListEmpty: {
    paddingHorizontal: 24,
    height: "50%",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  labelMessageList: {
    marginTop: 14,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#242424",
  },
});

export default styles;
