import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: SIZES.width - 50,
    marginBottom: 12,
  },
  titletxt: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    marginLeft: SIZES.small,
  },
  favContainer: (color) => ({
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.xSmall,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: color,
    ...SHADOWS.medium,
    shadowColor: COLORS.secondary,
  }),
  imageContainer: {
    width: 70,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTxt: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },
  supplya: {
    fontSize: SIZES.small + 2,
    fontFamily: "regular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
  orders:{
    backgroundColor:COLORS.lightWhite,
    paddingHorizontal:30,
    borderRadius:12
  }
});
export default styles;
