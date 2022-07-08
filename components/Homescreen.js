import { StatusBar } from "expo-status-bar";
import {
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import Location from "./LocationInfo";
import WeatherInfo from "./WeatherInfo";
import { LocationInput, GetLocationButton, ForecastButton } from "./Buttons.js";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Homescreen({
  location,
  setLocation,
  tempLocation,
  setTempLocation,
  refresh,
  setRefresh,
  navigation,
  updateLocation,
  setUpdateLocation,
}) {
  const [weather, setWeather] = useState({
    condition: null,
    temperature: null,
    windSpeed: null,
    icon: null,
  });
  const fetchString = () => {
    if (location.city === undefined) {
      return `http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid={INSERT API KEY HERE}`;
    } else {
      return `http://api.openweathermap.org/data/2.5/weather?q=${location.city}&units=metric&appid={INSERT API KEY HERE}`;
    }
  };
  useEffect(() => {
    if (location.lat !== null && location.lon !== null) {
      axios
        .get(fetchString())
        .then((response) => {
          setWeather({
            condition: response.data.weather[0].description,
            temperature: response.data.main.temp,
            windSpeed: response.data.wind.speed,
            icon: response.data.weather[0].icon,
          });
          setLocation({
            city: response.data.name,
            lat: response.data.coord.lat,
            lon: response.data.coord.lon,
            prev: location.prev,
          });
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            Alert.alert("Location not found, try another one");
            setLocation({
              city: location.prev,
              lat: location.lat,
              lon: location.lon,
              prev: location.prev,
            });
          }
        });
    }
  }, [refresh]);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Location
          location={location}
          setLocation={setLocation}
          refresh={refresh}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <WeatherInfo weather={weather} />
          <ForecastButton navigation={navigation} />
          <LocationInput
            location={location}
            setLocation={setLocation}
            tempLocation={tempLocation}
            setTempLocation={setTempLocation}
            refresh={refresh}
            setRefresh={setRefresh}
          />
          <GetLocationButton
            updateLocation={updateLocation}
            setUpdateLocation={setUpdateLocation}
          />
          <StatusBar style="auto" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#F5F5F5",
  },

  refresh: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 30,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  input: {
    height: 50,

    borderWidth: 1,
    padding: 10,
  },
  search: {
    width: "90%",
  },
});
