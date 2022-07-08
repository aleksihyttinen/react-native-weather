import { Text, View, StyleSheet} from "react-native";
import GetIcon from "./GetIcon";
export default function LocationInfo({ location }) {
  return (
    <View style={styles.locationInfo}>
      <GetIcon icon={"location"} />
      <Text style={styles.text}>{location.city}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
  locationInfo: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
