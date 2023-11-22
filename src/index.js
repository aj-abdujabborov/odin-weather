import "./index.scss";

const key = "29f7bb886J64ei9j00b44Z69413Tajb99DbX7h1y4v311E2Y0N273C2U0g141f";
// hopefully can hide it from the bots at least, for now

async function getWeatherForCity(cityName) {
  try {
    const unlock = key
      .split("")
      .filter((v, ind) => ind % 2 === 0)
      .join("");

    const ftch = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${unlock}&q=${cityName}`,
      { mode: "cors" },
    );
    const data = await ftch.json();

    if (data.error !== undefined) {
      throw new Error(data.error.message);
    }

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

const WeatherInterface = (function () {
  let data;

  function getData(tempUnit, distUnit) {
    return data.then((d) => {
      return {
        city: d.location.name,
        country: d.location.country,
        localTime: d.location.localtime.split(" ")[1],
        currTemp: tempUnit === "c" ? d.current.temp_c : d.current.tepm_f,
        perceivedTemp:
          tempUnit === "c" ? d.current.feelslike_c : d.current.feelslike_f,
        windSpeed: distUnit === "kph" ? d.current.wind_kph : d.current.wind_mph,
        windDir: d.current.wind_dir,
      };
    });
  }

  function setCity(cityName) {
    data = s(cityName);

    async function s(cN) {
      return await getWeatherForCity(cN);
    }
  }

  return {
    setCity,
    getData,
  };
})();

(function DOMManager() {
  //
})();

WeatherInterface.setCity("London");
WeatherInterface.getData("c", "kph").then((x) => console.log(x));

// function getWeatherForCity(cityName) {
//   return new Promise((resolve, reject) => {
//     fetch(
//       `https://api.weatherapi.com/v1/current.json?key=02rukldjasfklj209ueadfasd9&q=${cityName}`,
//       { mode: "cors" },
//     )
//       .then((response) => {
//         return response.json();
//       })
//       .then((response) => {
//         if (response.error !== undefined) {
//           reject("Wrong API key");
//         }
//         resolve(response);
//       });
//   });
// }

// function setCity(cityName) {
//   data = new Promise((resolve, reject) => {
//     getWeatherForCity(cityName).then((d) => {
//       if (d.location === undefined) {
//         reject(d);
//       }
//       resolve(d);
//     });
//   });
// }
