export default async function getWeatherForCity(cityName) {
  const key = "29f7bb886J64ei9j00b44Z69413Tajb99DbX7h1y4v311E2Y0N273C2U0g141f";
  // hopefully can hide it from the bots at least, for now

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
