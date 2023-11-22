import getWeatherForCity from "./GetWeather";

export default (function WeatherInterface() {
  let data;

  function getData(tempUnit, distUnit) {
    return data.then((d) => ({
      city: d.location.name,
      country: d.location.country,
      localTime: d.location.localtime.split(" ")[1],
      currTemp: tempUnit === "C" ? d.current.temp_c : d.current.temp_f,
      perceivedTemp:
        tempUnit === "C" ? d.current.feelslike_c : d.current.feelslike_f,
      windSpeed: distUnit === "kph" ? d.current.wind_kph : d.current.wind_mph,
      windDir: d.current.wind_dir,
    }));
  }

  function setCity(cityName) {
    async function s(cN) {
      return getWeatherForCity(cN);
    }

    data = s(cityName);
  }

  return {
    setCity,
    getData,
  };
})();
