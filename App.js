import react from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homescreen from "./components/Homescreen";
import Forecast from "./components/Forecast";
import * as Location from "expo-location";
const Stack = createNativeStackNavigator();
export default function App() {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });
  const [tempLocation, setTempLocation] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [updateLocation, setUpdateLocation] = useState(false);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({ lat: loc.coords.latitude, lon: loc.coords.longitude });
      setRefresh(!refresh);
    })();
  }, [updateLocation]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Current weather"
          options={{
            headerShown: false,
          }}
        >
          {({ navigation }) => (
            <Homescreen
              location={location}
              setLocation={setLocation}
              tempLocation={tempLocation}
              setTempLocation={setTempLocation}
              refresh={refresh}
              setRefresh={setRefresh}
              navigation={navigation}
              updateLocation={updateLocation}
              setUpdateLocation={setUpdateLocation}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Forecast">
          {({ navigation }) => (
            <Forecast
              location={location}
              refresh={refresh}
              navigation={navigation}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
