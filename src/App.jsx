// import { useState } from "react";
// import SearchBar from "./components/SearchBar";
// import WeatherCard from "./components/WeatherCard";
// import ErrorMessage from "./components/ErrorMessage";
// import { getWeatherByCity } from "./services/weatherService";
// import './App.css'

// export default function App() {
//     const [weather, setWeather] = useState(null);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSearch = async (city) => {
//         setLoading(true);
//         setError("");
//         setWeather(null);

//         try {
//             const data = await getWeatherByCity(city);
//             setWeather(data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="app">
//             <h1>Weather App</h1>
//             <SearchBar onSearch={handleSearch} />

//             {loading && <p>Loading...</p>}
//             {error && <ErrorMessage message={error} />}
//             {weather && <WeatherCard data={weather} />}
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import {
  getWeatherByCoords,
  getCoordsByCity,
  getCityByCoords,
} from "./services/weatherService";
import WeatherSkeleton from "./components/WeatherSkeleton";
import "./App.css";

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [displayCity, setDisplayCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-detect lokasi user
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Browser tidak mendukung lokasi");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          setLoading(true);

          const { latitude, longitude } = pos.coords;

          // Ambil cuaca
          const weatherData = await getWeatherByCoords(latitude, longitude);

          // Ambil nama kota (reverse geocoding)
          const cityName =
            (await getCityByCoords(latitude, longitude)) ??
            `Lat ${latitude.toFixed(2)}, Lon ${longitude.toFixed(2)}`;

          setWeather(weatherData);
          setDisplayCity(cityName);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => setError("Izin lokasi ditolak")
    );
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const location = await getCoordsByCity(searchValue);
      const data = await getWeatherByCoords(
        location.latitude,
        location.longitude
      );
      setWeather(data);
      setDisplayCity(location.name);
      setSearchValue("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <div className="header">
        <h1 className="app-title">Weather App</h1>
        <p className="app-subtitle">Real-time weather information</p>
      </div>

      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        onSubmit={handleSearch}
        loading={loading}
      />

      <ErrorMessage message={error} />

      {loading && <WeatherSkeleton />}

      {!loading && weather && (
        <WeatherCard city={displayCity} weather={weather} />
      )}
    </div>
  );
}
