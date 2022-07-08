import NA from "../assets/not-available.svg";
import Temp from "../assets/thermometer-glass.svg";
import Wind from "../assets/wind.svg";
import Location from "../assets/location-marker.svg";
import ClearD from "../assets/clear-day.svg";
import ClearN from "..//assets/clear-night.svg";
import Cloudy from "../assets/cloudy.svg";
import PartlyCloudyD from "../assets/partly-cloudy-day.svg";
import PartlyCloudyN from "../assets/partly-cloudy-night.svg";
import StrongClouds from "../assets/extreme.svg";
import StrongRain from "../assets/extreme-rain.svg";
import RainD from "../assets/partly-cloudy-day-rain.svg";
import RainN from "../assets/partly-cloudy-night-rain.svg";
import ThunderD from "../assets/thunderstorms-day.svg";
import ThunderN from "../assets/thunderstorms-night.svg";
import Snow from "../assets/snow.svg";
import Fog from "../assets/fog.svg";

export default function GetIcon({ icon, size }) {
  if (icon === "temp") {
    return <Temp width={120} height={120} />;
  }
  if (icon === "wind") {
    return <Wind width={120} height={120} />;
  }
  if (icon === "location") {
    return <Location width={50} height={50} />;
  }
  if (icon === "01d") {
    return <ClearD width={size} height={size} />;
  }
  if (icon === "01n") {
    return <ClearN width={size} height={size} />;
  }
  if (icon === "02d") {
    return <PartlyCloudyD width={size} height={size} />;
  }
  if (icon === "02n") {
    return <PartlyCloudyN width={size} height={size} />;
  }
  if (icon === "03d" || icon === "03n") {
    return <Cloudy width={size} height={size} />;
  }
  if (icon === "04d" || icon == "04n") {
    return <StrongClouds width={size} height={size} />;
  }
  if (icon === "09d" || icon === "09n") {
    return <StrongRain width={size} height={size} />;
  }
  if (icon === "10d") {
    return <RainD width={size} height={size} />;
  }
  if (icon === "10n") {
    return <RainN width={size} height={size} />;
  }
  if (icon === "11d") {
    return <ThunderD width={size} height={size} />;
  }
  if (icon === "11n") {
    return <ThunderN width={size} height={size} />;
  }
  if (icon === "13d" || icon === "13n") {
    return <Snow width={size} height={size} />;
  }
  if (icon === "50d" || icon === "50n") {
    return <Fog width={size} height={size} />;
  }

  return <NA width={size} height={size} />;
}
