import { Text, StyleSheet } from "react-native";
import { View } from "react-native";
import GetIcon from "./GetIcon";
export default function WeatherInfo({ weather }) {
  return (
    <View style={styles.weatherInfo}>
      <GetIcon icon={weather.icon} size={300} />
      <Text style={styles.text}>
        {weather.condition !== null
          ? weather.condition.charAt(0).toUpperCase() +
            weather.condition.slice(1)
          : ""}
      </Text>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
          }}
        >
          <GetIcon icon="temp" />
          <Text style={styles.text}>
            {" : " + parseInt(weather.temperature) + "°C"}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
          <GetIcon icon="wind" />
          <Text style={styles.text}>{" : " + weather.windSpeed + "m/s"}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    paddingBottom: 30,
  },
  img: {
    marginVertical: 50,
    width: 300,
    height: 300,
  },
  container: { flexDirection: "column" },
  weatherInfo: {
    width: "100%",
    alignItems: "center",
  },
});
