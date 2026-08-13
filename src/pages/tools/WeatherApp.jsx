import { useState } from "react";
import SEO from "../../components/SEO";
import { showToast } from "../../components/Toast";
import { trackEvent } from "../../utils/analytics";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setData(null);
    try {
      const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
      const json = await res.json();
      const current = json.current_condition[0];
      setData({
        temp: current.temp_C,
        desc: current.weatherDesc[0].value,
        humidity: current.humidity,
        wind: current.windSpeedKmph,
      });
      showToast("Weather loaded!");
      trackEvent("weather_lookup", { tool: "weather_app" });
    } catch {
      showToast("Could not fetch weather.", "error");
    }
    setLoading(false);
  };

  return (
    <>
      <SEO
        title="Weather App - AUQAB Tools"
        description="Check current weather for any city."
      />
      <section className="tool-page">
        <div className="password-card">
          <h1>Weather App</h1>
          <p className="tool-description">Enter a city name to see current weather.</p>

          <input
            type="text"
            placeholder="City name (e.g. London)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="url-input"
          />

          <button className="generate" style={{ margin: "15px 0" }} onClick={fetchWeather} disabled={loading}>
            {loading ? "Loading..." : "Get Weather"}
          </button>

          {data && (
            <div className="ssl-result">
              <p>Temperature: {data.temp}°C</p>
              <p>Condition: {data.desc}</p>
              <p>Humidity: {data.humidity}%</p>
              <p>Wind: {data.wind} km/h</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default WeatherApp;
