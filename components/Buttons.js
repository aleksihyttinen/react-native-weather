import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
export function GetLocationButton({ setRefresh, updateLocation, setUpdateLocation }) {
  return (
    <View style={styles.refresh}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert("Fetching current location");
          updateLocation ? setUpdateLocation(false) : setUpdateLocation(true);
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Get current location</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export function LocationInput({
  setLocation,
  setTempLocation,
  tempLocation,
  location,
  refresh,
  setRefresh,
}) {
  return (
    <View style={styles.search}>
      <TextInput
        style={styles.input}
        onChangeText={setTempLocation}
        value={tempLocation}
        placeholder="Enter a new location"
      />
      <TouchableOpacity
        onPress={() => {
          if (tempLocation.length !== 0 && tempLocation !== location) {
            setLocation({
              city: tempLocation,
              lat: location.lat,
              lon: location.lon,
              prev: location.city,
            });
            setTempLocation("");
            refresh ? setRefresh(false) : setRefresh(true);
          } else {
            Alert.alert("Please enter a new location");
          }
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Change location</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export function ForecastButton({ navigation }) {
  return (
    <View style={styles.forecast}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Forecast");
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Five Day Forecast</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  refresh: {
    flex: 1,
    alignItems: "center",
    marginVertical: 30,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    marginVertical: 10,
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
    backgroundColor: "white",
    borderRadius: 10,
  },
  search: {
    width: "80%",
  },
  forecast: { marginBottom: 30 },
});
