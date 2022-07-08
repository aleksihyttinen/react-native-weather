import { Text, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { View } from "react-native";
import axios from "axios";
import GetIcon from "./GetIcon";
export default function Forecast({ location, refresh }) {
  const [weather, setWeather] = useState([]);
  const weekday = ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"];

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid={INSERT API KEY HERE}`
      )
      .then((response) => {
        setWeather([
          response.data.daily[1],
          response.data.daily[2],
          response.data.daily[3],
          response.data.daily[4],
          response.data.daily[5],
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.lat, location.lon, refresh]);
  const renderItem = ({ item }) => {
    let date = new Date(item.dt * 1000);
    return (
      <View key={item.dt} style={styles.forecast}>
        <Text style={styles.date}>{`${
          weekday[date.getDay()]
        } ${date.getDate()}.${date.getMonth()}`}</Text>
        <GetIcon size={300} icon={item.weather[0].icon} style={styles.icon} />
        <Text style={styles.text}>
          {item.weather[0].description !== null
            ? item.weather[0].description.charAt(0).toUpperCase() +
              item.weather[0].description.slice(1)
            : ""}
        </Text>
        <View
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
          }}
        >
          <GetIcon icon="temp" />
          <Text style={styles.text}>
            {" : " + parseInt(item.temp.day) + "°C"}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
          <GetIcon icon="wind" />
          <Text style={styles.text}>{" : " + item.wind_speed + "m/s"}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.forecastContainer}>
      <FlatList
        data={weather}
        renderItem={renderItem}
        keyExtractor={(day) => day.dt}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  forecast: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
  },
  forecastContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 40,
    paddingBottom: 30,
  },
  date: {
    fontSize: 70,
    marginTop: 30,
  },
});
