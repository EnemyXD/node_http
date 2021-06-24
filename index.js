const http = require("http");
const readline = require("readline");

const input = readline.createInterface(process.stdin);

console.log("Введите название города на английском");

input.on("line", (args) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.ACCESS_KEY}&query=${args}`;

  http
    .get(url, (res) => {
      res.statusCode !== 200 && console.log("error" + res.statusCode);
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log(
            `Регион: ${parsedData.location.country} - ${parsedData.location.region} - ${parsedData.location.name}`
          );
          console.log("Местное время: " + parsedData.location.localtime);
          console.log("Температура: " + parsedData.current.temperature);
          console.log(
            "Описание погоды: " + parsedData.current.weather_descriptions[0]
          );
          console.log("Скорость ветра: " + parsedData.current.wind_speed);
          console.log("Направление ветра: " + parsedData.current.wind_dir);
          console.log("Видимость: " + parsedData.current.visibility);
        } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on("error", (e) => {
      console.log(e);
    });
});
