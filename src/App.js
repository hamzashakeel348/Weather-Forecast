import React, { useState } from "react";
import "./App.css";
import keys from "./keys";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

let temp = "";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});

  let handleSubmit = function (e) {
    //update state
    e.preventDefault();

    setInput(temp);

    trigger();
  };

  let handleChange = function (e) {
    //save in a variable
    temp = e.target.value;
  };

  let trigger = function () {
    fetch(`${api.base}weather?q=${input}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((res) => {
        setWeather(res);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} className="input" />
      </form>
      <div>
        {typeof weather.main != "undefined" ? (
          <>
            <div className="location">
              {weather.name + ", " + weather.sys.country}
            </div>

            <div className="temperature">{Math.round(weather.main.temp)}°C</div>

            <div className="label">{weather.weather[0].main}</div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
