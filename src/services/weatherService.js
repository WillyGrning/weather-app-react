// const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
// const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// /**
//  * Fetch weather data by city name
//  * @param {string} city
//  * @returns {Promise<object>}
//  */
// export async function getWeatherByCity(city) {
//     if (!city) {
//         throw new Error("Nama kota tidak boleh kosong");
//     }

//     const response = await fetch(
//         `${BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
//     );

//     if (!response.ok) {
//         throw new Error("Kota tidak ditemukan");
//     }

//     return response.json();
// }

/**
 * Weather Service
 * Centralized API layer (easy to switch provider later)
 */
/**
 * Reverse geocoding: convert coordinates to city name
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<string>}
 */

const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";

/**
 * Get weather by coordinates
 */
export async function getWeatherByCoords(lat, lon) {
  if (lat == null || lon == null) {
    throw new Error("Koordinat tidak valid");
  }

  const url = `${WEATHER_BASE_URL}?latitude=${lat}&longitude=${lon}&current_weather=true`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Gagal mengambil data cuaca");
  }

  const data = await res.json();

  if (!data.current_weather) {
    throw new Error("Data cuaca tidak tersedia");
  }

  return data.current_weather;
}

/**
 * Convert city name to coordinates
 */
export async function getCoordsByCity(city) {
  if (!city) {
    throw new Error("Nama kota wajib diisi");
  }

  const url = `${GEOCODING_BASE_URL}?name=${encodeURIComponent(
    city
  )}&count=1&language=id&format=json`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Gagal mencari kota");
  }

  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("Kota tidak ditemukan");
  }

  return data.results[0];
}

/**
 * Reverse geocoding using OpenStreetMap Nominatim
 * Convert coordinates to human-readable location
 */
export async function getCityByCoords(lat, lon) {
  if (lat == null || lon == null) {
    throw new Error("Koordinat tidak valid");
  }

  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=id`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "weather-portfolio-app", // WAJIB untuk Nominatim
    },
  });

  if (!res.ok) {
    throw new Error("Gagal reverse geocoding");
  }

  const data = await res.json();

  if (!data.address) {
    return null;
  }

  const address = data.address;

  return (
    address.city ||
    address.town ||
    address.village ||
    address.county ||
    address.state ||
    null
  );
}

/**
 * Map Open-Meteo weathercode to icon
 */
export function getWeatherIcon(code) {
  const map = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌦️",
    61: "🌧️",
    71: "❄️",
    80: "🌧️",
    95: "⛈️",
  };

  return map[code] || "🌡️";
}
