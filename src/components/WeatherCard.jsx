// export default function WeatherCard({ data }) {
//     return (
//         <div className="weather-card">
//             <h2>{data.name}</h2>
//             <p>{Math.round(data.main.temp)}°C</p>
//             <p>{data.weather[0].description}</p>
//             <img
//                 src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
//                 alt="Weather icon"
//             />
//         </div>
//     );
// }
import { getWeatherIcon } from "../services/weatherService";

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
const getWeatherDescription = (code) => {
  if (code === 0) return "Cerah";
  if (code <= 3) return "Berawan";
  if (code <= 67) return "Hujan";
  if (code <= 77) return "Salju";
  if (code <= 99) return "Badai";
  return "Berawan Sebagian";
};

function getWindDirection(deg) {
  const directions = ["U", "TL", "T", "TG", "S", "BD", "B", "BL"];
  return directions[Math.round(deg / 45) % 8];
}

export default function WeatherCard({ city, weather }) {
  const icon = getWeatherIcon(weather.weathercode);
  const description = getWeatherDescription(weather.weathercode);

  return (
    <div className="weather-card">
      <div className="city-name">{city}</div>
      <div className="weather-icon">{icon}</div>
      <div className="temperature">{weather.temperature}°</div>
      <div className="weather-description">{description}</div>

      <div className="weather-details">
        <div className="detail-item">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
          </svg>
          <div className="detail-content">
            <div className="detail-label">Angin</div>
            <div className="detail-value">
              {weather.windspeed} km/j {getWindDirection(weather.winddirection)}
            </div>
          </div>
        </div>
      </div>

      <div className="update-time">{formatTime(weather.time)}</div>
    </div>
  );
}
