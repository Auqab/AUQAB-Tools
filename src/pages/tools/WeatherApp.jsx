import { useState } from "react";
import SEO from "../../components/SEO";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
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
    } catch {
      alert("Could not fetch weather.");
    }
    setLoading(false);
  };

  return (
    <>
      <SEO title="Weather App - AUQAB Tools" description="Check current weather for any city." />
      <section className="tool-page">
        <div className="password-card">
          <h1>🌦️ Weather App</h1>
          <input placeholder="City name (e.g. London)" value={city} onChange={(e) => setCity(e.target.value)} className="url-input" />
          <button className="generate" onClick={fetchWeather} disabled={loading} style={{ margin: "15px 0" }}>
            {loading ? "Loading..." : "Get Weather"}
          </button>
          {data && (
            <div className="ssl-result">
              <p>🌡️ {data.temp}°C</p>
              <p>☁️ {data.desc}</p>
              <p>💧 Humidity: {data.humidity}%</p>
              <p>💨 Wind: {data.wind} km/h</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default WeatherApp;
