// Import React and useState hook from the React library
import React, { useState } from "react";
// Import the CSS file for styling the Home component
import "../assets/Home.css";

// Define the Home component as a functional component
function Home() {
  // Define state variables using useState hook
  // selectedCity: stores the currently selected city
  // setSelectedCity: function to update the selectedCity state
  const [selectedCity, setSelectedCity] = useState("");
  const [viewCity, setViewCity] = useState("");
  // temperature: stores the current temperature
  // setTemperature: function to update the temperature state
  const [temperature, setTemperature] = useState(null);
  // loading: indicates whether data is being fetched
  // setLoading: function to update the loading state
  const [loading, setLoading] = useState(false);
  // error: stores any error messages
  // setError: function to update the error state
  const [error, setError] = useState(null);

  // Define an array of city objects with their names and coordinates
  const cities = [
    { name: "Dhaka", latitude: 23.8103, longitude: 90.4125 },
    { name: "Chittagong", latitude: 22.3569, longitude: 91.7832 },
    { name: "Rajshahi", latitude: 24.3745, longitude: 88.6042 },
    { name: "Khulna", latitude: 22.8456, longitude: 89.5403 },
    { name: "Sylhet", latitude: 24.8949, longitude: 91.8687 },
    { name: "Barisal", latitude: 22.701, longitude: 90.3535 },
    { name: "Rangpur", latitude: 25.7439, longitude: 89.2752 },
    { name: "Mymensingh", latitude: 24.7471, longitude: 90.4203 },
  ];

  // Function to fetch weather data for the selected city
  const fetchWeatherData = () => {
    // If no city is selected, exit the function
    if (!selectedCity) return;

    // Find the city object that matches the selected city name
    const city = cities.find((c) => c.name === selectedCity);
    // If the city is not found, exit the function
    if (!city) return;

    // Set loading to true and clear any previous errors
    setLoading(true);
    setError(null);

    // Fetch weather data from the API using the city's coordinates
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m`
    )
      .then((response) => {
        // If the response is not ok, throw an error
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        // Parse the response as JSON
        return response.json();
      })
      .then((data) => {
        // Set the temperature state with the fetched data
        setTemperature(data.current.temperature_2m);
        setViewCity(selectedCity);
        // Set loading to false as data fetching is complete
        setLoading(false);
      })
      .catch((error) => {
        // If an error occurs, set the error state and stop loading
        setError(error.message);
        setLoading(false);
      });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Call the fetchWeatherData function
    fetchWeatherData();
  };

  // Render the component's UI
  return (
    <div className="home-container">
      <h1 className="app-title">Weather App</h1>
      <form onSubmit={handleSubmit} className="weather-form">
        <div className="form-group">
          <label htmlFor="city">Select a city: </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            required
            className="input-field"
          >
            <option value="">Select a city</option>
            {/* Map through the cities array to create option elements */}
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">
          Get Weather
        </button>
      </form>

      {/* Conditionally render loading message */}
      {loading && <p className="loading-message">Loading...</p>}
      {/* Conditionally render error message */}
      {error && <p className="error-message">Error: {error}</p>}
      {/* Conditionally render weather result */}
      {temperature !== null && (
        <div className="weather-result">
          <h2>Current Temperature in {viewCity}</h2>
          <p className="temperature">{temperature} °C</p>
        </div>
      )}
    </div>
  );
}

// Export the Home component as the default export
export default Home;
