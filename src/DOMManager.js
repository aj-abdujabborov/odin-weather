import WeatherInterface from "./WeatherInterface";

export default (function DOMManager() {
  const elems = (function Nodes() {
    const form = document.querySelector("form");
    const search = form.querySelector("input#city-name");
    const infoDiv = document.querySelector("div.info");
    const location = infoDiv.querySelector(".location");
    const currTemp = infoDiv.querySelector(".curr-temperature > h2");
    const percTemp = infoDiv.querySelector("span.feels-like-temp");
    const wind = infoDiv.querySelector("span.wind");
    const localTime = infoDiv.querySelector("span.local-time");
    const unitsDiv = document.querySelector("div.units");
    const tempUnitsC = unitsDiv.querySelector("input#temp-unit-ce");
    const tempUnitsF = unitsDiv.querySelector("input#temp-unit-fa");
    const distUnitsK = unitsDiv.querySelector("input#dist-unit-km");
    const distUnitsM = unitsDiv.querySelector("input#dist-unit-mi");

    function getTempUnitDisp() {
      const radios = unitsDiv.querySelector("input[name='temp-unit']:checked");
      if (radios.id === "temp-unit-ce") return "C";
      return "F";
    }

    function getDistUnitDisp() {
      const radios = unitsDiv.querySelector("input[name='dist-unit']:checked");
      if (radios.id === "dist-unit-km") return "km/h";
      return "mi/h";
    }

    function getDistUnit() {
      if (getDistUnitDisp() === "km/h") return "kph";
      return "mph";
    }

    return {
      form,
      search,
      location,
      currTemp,
      percTemp,
      wind,
      localTime,
      tempUnitsC,
      tempUnitsF,
      distUnitsK,
      distUnitsM,
      getTempUnitDisp,
      getDistUnitDisp,
      getDistUnit,
    };
  })();

  function updateInfo(city) {
    WeatherInterface.setCity(city);
    WeatherInterface.getData(elems.getTempUnitDisp(), elems.getDistUnit()).then(
      (info) => {
        elems.location.textContent = `${info.city}, ${info.country}`;
        elems.currTemp.textContent = `${
          info.currTemp
        }°${elems.getTempUnitDisp()}`;
        elems.percTemp.textContent = `${
          info.perceivedTemp
        }°${elems.getTempUnitDisp()}`;
        elems.wind.textContent = `${info.windSpeed} ${elems.getDistUnitDisp()}`;
        elems.localTime.textContent = info.localTime;
      },
    );
  }

  elems.form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateInfo(elems.search.value);
  });

  [
    elems.distUnitsK,
    elems.distUnitsM,
    elems.tempUnitsC,
    elems.tempUnitsF,
  ].forEach((elem) => {
    elem.addEventListener("click", () => {
      updateInfo(elems.search.value);
    });
  });

  updateInfo(elems.search.value);
})();
